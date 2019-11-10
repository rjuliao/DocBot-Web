import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {  withRouter } from 'react-router-dom';
import { Card, CardContent, 
    Divider, 
    Typography, 
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField} from '@material-ui/core';
import { updateWeight, getWeight } from '../../../../../../services/api';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor : "#F4F6F8"
    },
    title: {
        marginBottom: '10px',
        color: '#1438A6'

    },
    button: {
        margin: theme.spacing(1),
    },
    subttitle: {
        marginBottom: '5px'
    },
    infoTop: {
        marginTop: '10px',
        color: "#3F51B5"
    },
    info: {
        margin: '10px',
        padding: 'initial'
    },
    icons: {
        marginRight: theme.spacing(1),
    }
}));

const Information = props => {
    const classes = useStyles(); 
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    /***********************************************************************/
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });
    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
            ...formState,
            values: {
            ...formState.values,
            [event.target.name]:
                event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
            },
            touched: {
            ...formState.touched,
            [event.target.name]: true
            }
        }));
    };

    const handleWeight = event =>{
        event.preventDefault();
        localStorage.setItem("p_weight", formState.values.peso)

        updateWeight(localStorage.getItem("p_id"), formState.values.peso, moment().format('DD/MM/YYYY'))
        .then(response => {
            return response.json();
        })  
        .then(json => {


            getWeight(localStorage.getItem("p_id"))
            .then(response => {
                return response.json();
            }) 
            .then(json=>{
                var l = json.weight.length
                var w = json.weight[l-2]
                localStorage.setItem('p_wold', w.value);
                
            })
            .catch(error => {
                console.log(error.message);
            });
    
        })
        .catch(error => {
            console.log(error.message);
        });


        handleClose();

    }

    return(
        <div className={classes.root}>
            <Typography
                className={classes.title}
                variant="h1"
            >
                Información del Paciente
            </Typography>
            <Typography
                className={classes.subttitle}
                variant="subtitle1"
            >
                Datos personales
            </Typography>
            <Divider/>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        className={classes.infoTop}
                        variant="h2"
                    >
                        {localStorage.getItem('p_Name')} {localStorage.getItem('p_lName')}
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Typography
                        className={classes.info}
                        variant="h6"
                    >
                        Edad: {localStorage.getItem('p_age')}
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Identificación: {localStorage.getItem('p_documentType')}: {localStorage.getItem('p_documentNumber')}
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Sexo: {localStorage.getItem('p_sex')=== 'f' ? "Mujer":"Hombre"}
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Fecha de Nacimiento: {localStorage.getItem('p_birthdate')}                        
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <Button variant="outlined" color="primary" className={classes.button} onClick={handleClickOpen}>
                        Peso: {localStorage.getItem('p_weight')}kg
                    </Button>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Estatura: {localStorage.getItem('p_height')}m
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        ICM: {(localStorage.getItem('p_weight')/Math.pow(localStorage.getItem('p_height'),2)).toFixed(3)}
                    </Typography>
                </Grid>
            </Grid>
            <Divider/>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={6}
                >
                    <Typography
                        className={classes.infoTop}
                        variant="h2"
                    >
                        El paciente es diabético:
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Typography
                        className={classes.info}
                        variant="h3"
                    >
                        {
                            !localStorage.getItem("p_isDiabetic") ? "SI":"NO"
                        }
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        className={classes.infoTop}
                        variant="h2"
                    >
                        Información Médica
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        className={classes.info}
                        variant="subtitle1"
                    >
                        Información médica al momento del ingreso al sistema
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="body1"
                    >
                        {localStorage.getItem('p_clinicalC')}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        className={classes.infoTop}
                        variant="h2"
                    >
                        FINDRISK TEST
                    </Typography>
                    <Divider/>
                    {parseInt(localStorage.getItem('p_vtf'),10) === 0? 
                    <Typography>
                        Este paciente no tiene aplicado el test
                    </Typography>:
                    <Typography
                        className={classes.info}    
                        variant="body1"
                    >
                        {
                        parseInt(localStorage.getItem('p_vtf'),10) > 14 ? 
                        "Su puntaje es: " + localStorage.getItem('p_vtf') +" ¡OJO! Esta por encima en riesgo de desarrollar diabetes"
                        :
                        "Su puntaje es: " + localStorage.getItem('p_vtf') +" Esta por debajo del índice de riesgo para desarrollar diabetes"
                        }
                    </Typography>}
                    <Typography
                        className={classes.info}    
                        variant="subtitle2"
                    >
                        El test FINDRISK no puede reemplazar un diagnostico facultativo
                    </Typography>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Desea Añadir muestra de peso?"}</DialogTitle>
                <DialogContent>
                <Card>
                    <form
                        autoComplete="off"
                        noValidate
                    >
                        <CardContent>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    sx={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Peso"
                                        margin="dense"
                                        name="peso"
                                        onChange={handleChange}
                                        value={formState.values.peso || ''}
                                        required
                                        type="number"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </form>
                </Card>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleWeight} color="primary">
                    Aceptar
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Cancelar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

Information.propTypes = {
    user: PropTypes.isRequired,
    history: PropTypes.object
};
export default withRouter(Information);