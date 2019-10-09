import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import { Card, 
        CardHeader, 
        Divider, 
        CardContent, 
        Grid, 
        CardActions, 
        TextField, 
        Button} from '@material-ui/core';

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

const MainParaclinicos = props =>{
  const {user} = props

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


  /**
   * Funcion para tomar los valores de los paraclínicos
   * @param {*} event 
   */
  const handleData = event =>{
    console.log(formState.values.trigliceridos);
    console.log(formState.values.colesterol);
    console.log(formState.values.hemoglobina_glicosilada);
    console.log(formState.values.glicemia);
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
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Ingresar Valores
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default MainParaclinicos;