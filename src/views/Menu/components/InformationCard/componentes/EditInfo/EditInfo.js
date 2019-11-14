import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {  withRouter } from 'react-router-dom';
import { Card, CardContent,  
    Grid, 
    Button, 
    Fab, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField} from '@material-ui/core';
import Create from '@material-ui/icons/Create';
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
    },
    Button: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.white
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
    age: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      type: 'number',
      
    },
    idnum: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 15
      }
    },
    phone: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
    },
    date: {
      presence: { allowEmpty: false, message: 'Obligatorio' },

    },
    idtipo: {
      presence: { allowEmpty: false, message: 'Obligatorio' },

    }
};


const EditInfo = props => {
    const classes = useStyles(); 


    //----------------------------------------------------------------------------------------
    const [openD, setOpenD] = React.useState(false);

    const handleClickOpenD = () => {
        setOpenD(true);
    };

    const handleCloseD = () => {
        setOpenD(false);
    };

    
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

            <Fab variant="extended"  color="primary" aria-label="add" onClick={handleClickOpenD} className={classes.margin}>
                <Create className={classes.icons} />
                    Editar información
            </Fab>
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
                                        error={hasError('age')}
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
                                            error={hasError('phone')}
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
                                            error={hasError('idtipo')}
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
                                            error={hasError('idnum')}
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
                    <Button 
                        className={classes.Button} 
                        variant="contained" 
                        onClick={handleEdit}
                        disabled={!formState.isValid}
                    >
                        Editar
                    </Button>
                    <Button onClick={handleCloseD} variant="contained" color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default withRouter(EditInfo);