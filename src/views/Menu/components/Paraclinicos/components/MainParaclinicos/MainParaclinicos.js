import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {  withRouter } from 'react-router-dom';
import { Card, 
        CardHeader, 
        Divider, 
        CardContent, 
        Grid, 
        CardActions, 
        TextField, 
        Button,
        Fab} from '@material-ui/core';
import AddButton from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/styles';

const schema = {
    hemoglobina_glicosilada: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 5
      }
    },
    trigliceridos: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 5
      }
    },
    colesterol: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 5
      }
    },
    glicemia: {
      presence: { allowEmpty: false, message: 'Obligatorio' },
      length: {
        maximum: 5
      }
    }
  };

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
    },
    buttonbase: {
      marginRight: theme.spacing(1),
    }
}));

const MainParaclinicos = props =>{
  const { history, user, className, ...rest } = props;
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


  const clear = ()=>{
    
  }

  /**
   * Funcion para tomar los valores de los paraclínicos
   * @param {*} event 
   */
  const handleData = event =>{
    event.preventDefault();
    console.log(formState.values.trigliceridos);
    console.log(formState.values.colesterol);
    console.log(formState.values.hemoglobina_glicosilada);
    console.log(formState.values.glicemia);
    formState.values.trigliceridos = "";
    formState.values.colesterol = "";
    formState.values.hemoglobina_glicosilada = "";
    formState.values.glicemia = "";
    history.push({
      pathname:"/menu",
      info:{ nombre: user}
    });
  }

  return(
    <Card>
      <form    
        autoComplete="off"
        noValidate
        onSubmit={handleData}
      >
        <CardHeader
          subheader="Ingresar datos paraclínicos"
          title="Paraclinicos"
        />
        <Divider/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
                item
                xs={3}
            >
              <TextField
                fullWidth
                error={hasError('hemoglobina_glicosilada')}
                label="Hemoglobina Glicosilada"
                margin="dense"
                name="hemoglobina_glicosilada"
                onChange={handleChange}
                value={formState.values.hemoglobina_glicosilada || ''}
                required
                type="number"
                variant="outlined"
              />
            </Grid>
            
            <Grid
              item
              xs={3}
            >
              <TextField
                fullWidth
                error={hasError('trigliceridos')}
                label="Triglicéridos"
                margin="dense"
                name="trigliceridos"
                onChange={handleChange}
                value={formState.values.trigliceridos || ''}
                required
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={3}
            >
              <TextField
                fullWidth
                error={hasError('glicemia')}
                label="Glicemia"
                margin="dense"
                name="glicemia"
                onChange={handleChange}
                value={formState.values.glicemia || ''}
                required
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={3}
            >
              <TextField
                fullWidth
                error={hasError('colesterol')}
                label="Colesterol"
                margin="dense"
                name="colesterol"
                onChange={handleChange}
                value={formState.values.colesterol || ''}
                required
                type="number"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Fab  
            color="primary"
            variant="contained"
            type="submit"
          >
            <AddButton className={classes.buttonbase}/>
            Ingresar Valores
          </Fab>
        </CardActions>
      </form>
    </Card>
  )
}
MainParaclinicos.propTypes = {
  user: PropTypes.isRequired,
  history: PropTypes.object
};
export default withRouter(MainParaclinicos);