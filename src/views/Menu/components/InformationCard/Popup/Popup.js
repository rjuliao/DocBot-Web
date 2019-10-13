import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Button, 
    Card, 
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField} from '@material-ui/core';
import PerfectScrollbar from 'perfect-scrollbar';

const useStyles = makeStyles(theme => ({
    popup: {  
        position: "fixed",  
        width: "100%", 
        height: "100%",  
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        margin: "auto",  
        backgroundColor: "rgba(0,0,0, 0.5)",  
    },  
    popup_inner: {  
        position: "absolute",  
        left: "20%",  
        right: "20%",  
        top: "10%",  
        bottom: "20%",  
        margin: "auto",  
        borderRadius: "20px",  
        background: "white",  
    },
    title: {
        fontSize: 14,
    },
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

const Popup = props => {
    const {user, closePopup} = props;
    const classes = useStyles();
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

    return (
        <div className={classes.popup}>
            <div className={classes.popup_inner}>
                
                <Card>
                    <form>
                        <CardHeader
                            title="Editar información del paciente"
                        />
                        <Divider/>
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
                            <Divider />
                            <CardHeader
                            subheader="Perfil del paciente"
                            />
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
                                    fullWidth
                                    error={hasError('centro_medico')}
                                    label="Centro de Salud"
                                    margin="dense"
                                    name="centro_medico"
                                    onChange={handleChange}
                                    value={formState.values.centro_medico || ''}
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
                                    error={hasError('peso')}
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
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                    fullWidth
                                    error={hasError('altura')}
                                    label="Altura"
                                    margin="dense"
                                    name="altura"
                                    onChange={handleChange}
                                    value={formState.values.altura || ''}
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
                                    label="Sexo"
                                    margin="dense"
                                    name="sexo"
                                    onChange={handleChange}
                                    value={formState.values.sexo || ''}
                                    required
                                    select
                                    // eslint-disable-next-line react/jsx-sort-props
                                    SelectProps={{ native: true }}
                                    
                                    variant="outlined"
                                >
                                    {sexo.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                    ))}
                                </TextField>
                                </Grid>
                            </Grid>
                            </CardContent>
                            <Divider/>
                            <CardContent>
                            <Grid
                                container   
                                spacing={3}
                            >
                                <Grid
                                item
                                
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Contexto clínico en el ingreso actual"
                                    margin="dense"
                                    multiline
                                    rowsMax="6"
                                    name="contexto"
                                    onChange={handleChange}
                                    value={formState.values.contexto || ''}
                                    margin="normal"
                                    required
                                    variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </form>
                </Card>
                
            </div>
        </div>
    );
}

Popup.propTypes = {
    user: PropTypes.array.isRequired,
    close4: PropTypes.isRequired,
};


export default Popup;