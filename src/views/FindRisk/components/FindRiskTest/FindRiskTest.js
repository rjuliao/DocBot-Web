import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink, withRouter } from 'react-router-dom';
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
  InputAdornment,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const hombre = [
  {
    value: "0",
  },
  {
    value: 'r1',
    label: 'Menos de 94 cm.'
  },
  {
    value: 'r2',
    label: 'Entre 94 - 102 cm.'
  },
  {
    value: 'r3',
    label: 'Más de 102 cm.'
  }
];

const mujer = [
  {
    value: "0",
  },
  {
    value: 'r1',
    label: 'Menos de 80 cm.'
  },
  {
    value: 'r2',
    label: 'Entre 80 - 88 cm.'
  },
  {
    value: 'r3',
    label: 'Más de 88 cm.'
  }
];
const pv1 = [
  {
    value: '2',
    label: 'Si.'
  },
  {
    value: '0',
    label: 'No.'
  }
];
const pv2 = [
  {
    value: '5',
    label: 'Si.'
  },
  {
    value: '0',
    label: 'No.'
  }
];
const p6 = [
  {
    value: '0',
    label: 'Todos los días'
  },
  {
    value: '1',
    label: 'No todos los días'
  }
];
const p8 = [

  {
    value: '0',
    label: 'No'
  },
  {
    value: '3',
    label: 'Sí: abuelos, tía, tío, primo hermano'
  },
  {
    value: '5',
    label: 'Sí: padres, hermanos o hijos'
  }
];



const FindRiskTest = props => {
  const { idCard, history, className, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  
 
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
  

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader/>
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
              alignContent='center'
            >
              
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Peso (kilos)"
                margin="dense"
                name="weight"
                onChange={handleChange}
                value={formState.values.weight || ''}
                required
                type="number"
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                }}
              />

            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Altura (metros)"
                margin="dense"
                name="height"
                onChange={handleChange}
                value={formState.values.height || ''}
                required
                type="number"
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">m</InputAdornment>,
                }}
              />

            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                disabled
                label="ICM kg/m^2"
                margin="dense"
                name="icm"
                onChange={handleChange}
                value={formState.values.weight/Math.pow(formState.values.height,2)}
                required
                type="number"
                variant="outlined"
              />

            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="h4" color="primary">
                Perímetro de cintura medido por debajo de las costillas (normalmente a nivel del ombligo)
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Hombre"
                margin="dense"
                name="p3hombre"
                onChange={handleChange}
                value={formState.values.p3hombre || ''}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                
                variant="outlined"
              >
                {hombre.map(option => (
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
                label="Mujer"
                margin="dense"
                name="p3mujer"
                onChange={handleChange}
                value={formState.values.p3mujer || ''}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                
                variant="outlined"
              >
                {mujer.map(option => (
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
              md={12}
              xs={12}
            >
              <Typography variant="h4" color="primary">
              ¿Realiza habitualmente al menos 30 minutos de actividad física 
              cada día (o 4 horas semanales), en el trabajo y/o en el tiempo libre?
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label=""
                margin="dense"
                name="pv4"
                onChange={handleChange}
                value={formState.values.pv4 || ''}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                
                variant="outlined"
              >
                {pv1.map(option => (
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
              md={12}
              xs={12}
            >
              <Typography variant="h4" color="primary">
                ¿Toma medicación para la hipertensión regularmente?
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label=""
                margin="dense"
                name="pv5"
                onChange={handleChange}
                value={formState.values.pv5 || ''}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                
                variant="outlined"
              >
                {pv1.map(option => (
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
              md={12}
              xs={12}
            >
              <Typography variant="h4" color="primary">
                ¿Con qué frecuencia come verduras o frutas?
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label=""
                margin="dense"
                name="pv6"
                onChange={handleChange}
                value={formState.values.pv6 || ''}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                
                variant="outlined"
              >
                {p6.map(option => (
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
              md={12}
              xs={12}
            >
              <Typography variant="h4" color="primary">
              ¿Le han encontrado alguna vez valores de glucosa altos (por ejemplo, en un control médico,
              durante una enfermedad, durante el embarazo)?
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label=""
                margin="dense"
                name="pv7"
                onChange={handleChange}
                value={formState.values.pv7 || ''}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                
                variant="outlined"
              >
                {pv2.map(option => (
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
              md={12}
              xs={12}
            >
              <Typography variant="h4" color="primary">
                ¿Se le ha diagnosticado diabetes (tipo 1 o tipo 2) a alguno de sus familiares allegados u otros parientes?
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label=""
                margin="dense"
                name="pv8"
                onChange={handleChange}
                value={formState.values.pv8 || ''}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                
                variant="outlined"
              >
                {p8.map(option => (
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
        <CardActions>
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              Enviar encuesta
            </Button>
        </CardActions>
      </form>
    </Card>
  );
};

FindRiskTest.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
  idCard: PropTypes.object.isRequired,
};

export default withRouter(FindRiskTest);
