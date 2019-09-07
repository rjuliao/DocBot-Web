import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  

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
      label: 'Registro Civl'
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
      value: 'm',
      label: 'Femenino'
    },
    {
      value: 'o',
      label: 'Otro'
    }
  ];

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
                fullWidth
                helperText=""
                label="Nombres"
                margin="dense"
                name="firstName"
                onChange={handleChange}
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
                label="Apellidos"
                margin="dense"
                name="lastName"
                onChange={handleChange}
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
                name="b-day"
                onChange={handleChange}
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
                label="E-mail"
                margin="dense"
                name="email"
                onChange={handleChange}
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
                label="Número de celular"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
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
                name="id"
                onChange={handleChange}
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
                  label="Centro de Salud"
                  margin="dense"
                  name="centro-salud"
                  onChange={handleChange}
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
                label="Fecha de Ingreso"
                margin="dense"
                name="fecha-ingresp"
                onChange={handleChange}
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
                  label="Peso"
                  margin="dense"
                  name="centro-salud"
                  onChange={handleChange}
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
                  label="Altura"
                  margin="dense"
                  name="altura"
                  onChange={handleChange}
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
                  name="contexto-inicial"
                  onChange={handleChange}
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
          >
            Crear Paciente
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
