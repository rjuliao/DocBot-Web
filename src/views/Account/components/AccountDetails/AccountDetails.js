import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {  withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  InputAdornment
} from '@material-ui/core';
import { regPaciente, medicalInfos, getSinglePatient, createModel } from '../../../../services/api';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {}
}));

const diabtic = [
  {
    value: "empty"
  },
  {
    value: 1,
    label: 'SI'
  },
  {
    value: 0,
    label: 'NO'
  },
]

const fumador = [
  {
    value: "empty"
  },
  {
    value: 1,
    label: 'SI'
  },
  {
    value: 0,
    label: 'NO'
  },
]

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
  email: {
    presence: { allowEmpty: false, message: 'es obligatorio' },
    email: true,
    length: {
      maximum: 64
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
  contexto: {
    presence: { allowEmpty: false, message: 'Obligatorio' },
    length: {
      maximum: 500
    }
  },
};

const AccountDetails = props => {
  const { history, className, ...rest } = props;

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


  const medicalInfor = (contexto, centre_medico, diabetico,peso, altura, perimetroAbd, id) =>{
 
    medicalInfos(contexto, centre_medico,0, diabetico,peso, altura, perimetroAbd, id, moment().format('DD/MM/YYYY'))
    .then(response => {
      return response.json();
    })
    .then(json => {
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  const modelo = (id) =>{
    createModel(id)
    .then(response => {
      return response.json();
    })
    .then(json => {
        history.push("/pacientes");
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  const registro = (name, lastName, b_date, age,
    idtipo, idCard, peso, altura, sexo, psw, 
    contexto, centre_medico, email, diabetico, idDoctor, perimetroAbd, fumador) =>{
 

    regPaciente(name, lastName, b_date, age, idtipo, idCard, 
      sexo, psw, email, idDoctor, "",  moment().format('DD/MM/YYYY'),"0",fumador,"")
    .then(response => {
      return response.json();
    })
    .then(json => {

      getSinglePatient(idCard)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setTimeout(function(){

          medicalInfor(contexto, centre_medico, diabetico, peso, altura, perimetroAbd, json.id) 
        
          modelo(json.id)

        }, 500);
      })
      .catch(error => {
        console.log(error.message);
      });

    })
    .catch(error => {
      console.log(error.message);
    });
  }


 
  /***************Registro del paciente****************/
  const handleRegister = event =>{
    event.preventDefault();
  

    registro(formState.values.name, formState.values.lastName, 
      moment(formState.values.b_day).format("DD/MM/YYYY"), formState.values.age, formState.values.tipoid, formState.values.idnumber,
      formState.values.peso, formState.values.altura,
      formState.values.sexo, formState.values.idnumber, formState.values.contexto,
      formState.values.centro_medico, formState.values.email, formState.values.isDiabetic,
       localStorage.getItem("id"), formState.values.fumador);

  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        
      >
        <CardHeader
          subheader="Datos personales"
          title="Crear nuevo paciente"
        />
        <Divider />
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
                error={hasError('email')}
                label="Email"
                margin="dense"
                name="email"
                onChange={handleChange}
                value={formState.values.email || ''}
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
                error={hasError('docnum')}
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
                label="¿Es diabético?"
                margin="dense"
                name="isDiabetic"
                onChange={handleChange}
                value={formState.values.isDiabetic || ''}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                
                variant="outlined"
              >
                {diabtic.map(option => (
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
                  label="Peso"
                  margin="dense"
                  name="peso"
                  onChange={handleChange}
                  value={formState.values.peso || ''}
                  required
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="end">kg</InputAdornment>,
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
                  label="Altura"
                  margin="dense"
                  name="altura"
                  onChange={handleChange}
                  value={formState.values.altura || ''}
                  required
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="end">m</InputAdornment>,
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
                  label="Perímetro Abdominal"
                  margin="dense"
                  name="perimetroAbd"
                  onChange={handleChange}
                  value={formState.values.perimetroAbd || ''}
                  required
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment position="end">cm</InputAdornment>,
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
              <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
                fullWidth
                label="¿Es fumador?"
                margin="dense"
                name="fumador"
                onChange={handleChange}
                value={formState.values.fumador || ''}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                
                variant="outlined"
              >
                {fumador.map(option => (
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
                  error={hasError('contexto')}
                  label="Contexto clínico en el ingreso actual"
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
        <CardActions>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleRegister}
              disabled={!formState.isValid}
              size="large"
            >
              Crear Paciente
            </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

export default withRouter(AccountDetails);
