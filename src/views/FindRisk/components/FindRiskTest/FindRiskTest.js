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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  formControl: {
    margin: 3,
  },
  info: {
      margin: '10px',
      padding: 'initial'
  }
}));







const FindRiskTest = props => {
  const { information, history, className, ...rest } = props;

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
  

  const getValues = (age, weight, height, gender, pv4, pv5, pv6, pv7, pv8) =>{
    console.log(information)
    history.push('/pacientes');
  }

  const handleRisk = event =>{
    event.preventDefault();
    getValues(formState.values.age, formState.values.weight, formState.values.height,
              formState.values.p3, formState.values.pv4, formState.values.pv5, 
              formState.values.pv6, formState.values.pv7, formState.values.pv8)
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleRisk}
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
              <Typography variant="body1">
                Edad: {information.edad} años
              </Typography>
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
              
              <Typography
                className={classes.info}    
                variant="h6"
              >
                Peso: {information.weight}kg
              </Typography>

            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography
                className={classes.info}    
                variant="h6"
              >
                Altura: {information.height}m
              </Typography>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
            <Typography
              className={classes.info}    
              variant="h6"
            >
              ICM: {information.weight/Math.pow(information.height,2)}m
            </Typography>
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
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Hombre</FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={formState.values.gender} onChange={handleChange}>
                  <FormControlLabel value="0" control={<Radio />} label="Menos de 94 cm." />
                  <FormControlLabel value="3" control={<Radio />} label="Entre 94 - 102 cm." />
                  <FormControlLabel value="4" control={<Radio />} label="Más de 102 cm." />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Mujer</FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={formState.values.gender} onChange={handleChange}>
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Menos de 80 cm."
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio color="primary" />}
                    label="Entre 80 - 88 cm."
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio color="primary" />}
                    label="Más de 88 cm."
                  />
                </RadioGroup>
              </FormControl>
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
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup aria-label="gender" name="pv4" value={formState.values.pv4} onChange={handleChange}>
                  <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="Si."
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="No."
                  />
                </RadioGroup>
              </FormControl>
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
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup aria-label="gender" name="pv5" value={formState.values.pv5} onChange={handleChange}>
                  <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="Si."
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="No."
                  />
                </RadioGroup>
              </FormControl>
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
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup aria-label="gender" name="pv6" value={formState.values.pv6} onChange={handleChange}>
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Todos los días."
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="No todos los Días."
                  />
                </RadioGroup>
              </FormControl>
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
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup aria-label="gender" name="pv7" value={formState.values.pv7} onChange={handleChange}>
                  <FormControlLabel
                    value="5"
                    control={<Radio color="primary" />}
                    label="Si."
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="No."
                  />
                </RadioGroup>
              </FormControl>
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
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup aria-label="gender" name="pv8" value={formState.values.pv8} onChange={handleChange}>
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="No."
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio color="primary" />}
                    label="Sí: abuelos, tía, tío, primo hermano"
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio color="primary" />}
                    label="Sí: padres, hermanos o hijos"
                  />
                </RadioGroup>
              </FormControl>
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
  information: PropTypes.object.isRequired,
};

export default withRouter(FindRiskTest);
