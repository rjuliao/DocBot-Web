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
import { Information } from './componentes';
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
        marginRight: theme.spacing(1),
    }
}));


const id = [
    {
      value: "empty"
    },
    {
      value: 'cc',
      label: 'Cedula de Ciudadania'
    },
    {
      value: 'ti',
      label: 'Tarjeta de Identidad'
    },
    {
      value: 'rc',
      label: 'Registro Civil'
    },
    {
      value: 'pst',
      label: 'Pasaporte'
    },
    {
      value: 'ce',
      label: 'Cédula Extranjeria'
    }
];
  
const sexo = [
    {
      value: "empty"
    },
    {
      value: 'm',
      label: 'Masculino'
    },
    {
      value: 'f',
      label: 'Femenino'
    },
    {
      value: 'o',
      label: 'Otro'
    }
];
  
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

    //----------------------------------------------------------------------------------------
    const [openD, setOpenD] = React.useState(false);

    const handleClickOpenD = () => {
        setOpenD(true);
    };

    const handleCloseD = () => {
        setOpenD(false);
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
    
    //-----------------------------------------------------------------------------------------
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

    setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
    }));
    }, [formState.values]);

    
    /***************Esta funcioón toma los valores en los textfields****************/
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
    
    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

    const handleEdit = event =>{
        event.preventDefault();
        console.log(formState.values.name)
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
                    <Fab variant="extended"  color="primary" onClick={handleClickOpenD} aria-label="add" className={classes.margin}>
                        <CreateIcon className={classes.icons}/>
                        Editar Información
                    </Fab>
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
            <Dialog 
                open={openD} 
                fullWidth={true}
                maxWidth="mg"
                onClose={handleCloseD} 
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Editar el paciente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Editar la infromación del paciente
                    </DialogContentText>
                    <Card>
                        <form
                            autoComplete="off"
                            noValidate
                            onSubmit={handleEdit}
                        >
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            error={hasError('name')}
                                            fullWidth
                                            label="Nombres"
                                            margin="dense"
                                            name="name"
                                            onChange={handleChange}
                                            value={formState.values.name || ''}
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                    <TextField
                                        error={hasError('lastName')}
                                        fullWidth
                                        label="Apellidos"
                                        margin="dense"
                                        name="lastName"
                                        onChange={handleChange}
                                        value={formState.values.lastName || ''}
                                        required
                                        variant="outlined"
                                    />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                    <TextField
                                        fullWidth
                                        label="Fecha de Nacimiento"
                                        margin="dense"
                                        name="b_day"
                                        onChange={handleChange}
                                        value={formState.values.b_day || ''}
                                        required
                                        type="date"
                                        defaultValue=""
                                        variant="outlined"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    </Grid>
                                    <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    >
                                    <TextField
                                        fullWidth
                                        label="Edad"
                                        margin="dense"
                                        name="age"
                                        onChange={handleChange}
                                        value={formState.values.age || ''}
                                        required
                                        type="number"
                                        variant="outlined"
                                    />
                                    </Grid>
                                    <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Número de celular"
                                            margin="dense"
                                            name="phone"
                                            onChange={handleChange}
                                            value={formState.values.phone || ''}
                                            type="number"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Tipo de doc. indentidad"
                                            margin="dense"
                                            name="tipoid"
                                            onChange={handleChange}
                                            value={formState.values.tipoid || ''}
                                            required
                                            select
                                            // eslint-disable-next-line react/jsx-sort-props
                                            SelectProps={{ native: true }}
                                            
                                            variant="outlined"
                                        >
                                            {id.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="No. documento de identidad"
                                            margin="dense"
                                            name="idnumber"
                                            onChange={handleChange}
                                            value={formState.values.idnumber || ''}
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
                    <Button color="primary" onClick={handleEdit}>
                        Editar
                    </Button>
                    <Button onClick={handleCloseD} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default withRouter(InformationCard);