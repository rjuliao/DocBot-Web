import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Card, CardContent, CardHeader, 
    Divider, 
    Typography, 
    Grid, 
    Button, 
    Fab, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import TestIcon from '@material-ui/icons/FormatListBulleted'
import { detelePatient } from '../../../../services/api';
import { Information, EditInfo } from './componentes';
import validate from 'validate.js';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor : "#F4F6F8"
    },
    title: {
        marginBottom: '10px',
        color: '#1438A6'

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
        marginRight: theme.spacing(2),
    }
}));


const schema = {
    name: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 32
      }
    },
    lastName: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 32
      }
    },
    centro_medico: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 32
      }
    },
    idCard: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 15
      }
    },
    age: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 2
      }
    },
    peso: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 5
      }
    },
    altura: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 5
      }
    }
};


const InformationCard = props => {
    const { history, user } = props
    const classes = useStyles(); 

    //----------------------------------------------------------------------------------------
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleDelete = () =>{
        
        detelePatient(localStorage.getItem("p_id"))
        .then(response => {
            return response.json();
        })  
        .then(json => {
        })
        .catch(error => {
            console.log(error.message);
        });
    }
    
    
    
    return(
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Information/>
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <Fab variant="extended"  color="primary" aria-label="add" onClick={handleClickOpen} className={classes.margin}>
                        <DeleteIcon className={classes.icons} />
                         Eliminar Paciente
                    </Fab>
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                   <EditInfo/>
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <RouterLink 
                        to={"/findrisk"}
                    >
                        <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
                            <TestIcon className={classes.icons}/>
                            Aplicar FindRisk
                        </Fab>
                    </RouterLink>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Eliminar Paciente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Esta seguro que desea eliminar a  {localStorage.getItem('p_Name')} {localStorage.getItem('p_lName')}
                         de sus registros?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <RouterLink
                        to={'/pacientes'}
                    >
                        <Button onClick={() => handleDelete()} color="primary">
                            Eliminar
                        </Button>
                    </RouterLink>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
           
        </div>
    );
}


export default withRouter(InformationCard);