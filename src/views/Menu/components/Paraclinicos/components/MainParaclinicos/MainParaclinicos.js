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
import { setParaclinico } from '../../../../../../services/api';

const schema = {
  tipo:{
    presence: {allowEmpty: false, message: 'Obligatorio'},
    length:{
      maximum: 4
    }
  },
  value:{
    presence: {allowEmpty: false, message: 'Obligatorio'},
    length:{
      maximum: 4
    }
  },
  comentario: {
    presence: { allowEmpty: false, message: 'Obligatorio' },
    length: {
      maximum: 5
    }
  }
    
};


const typeP = [
  {
    value: "0",
    label: ""
  },
  {
    value: "glucosa",
    label: "Glucosa"
  },
  {
    value: "hemoglobina_glicosilada",
    label: "Hemoglobina Glicosidada"
  },
  {
    value: "trigliceridos",
    label: "Trigliceridos "
  },
  {
    value: "glicemia",
    label: "Glicemia"
  },
  {
    value: "colesterol_total",
    label: "Colesterol Total"
  },
  {
    value: "otro",
    label: "Otro"
  },
]

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

  const sendParaclinicos = (type, value, comment, id) => {
  
    setParaclinico(type, value, comment, id )
    .then(response => {
      return response.json();
    })  
    .then(json => {
      //console.log(JSON.stringify(json));
    })
    .catch(error => {
      console.log(error.message);
    });

  }

  /**
   * Funcion para tomar los valores de los paraclínicos
   * @param {*} event 
   */
  const handleData = event =>{
    event.preventDefault();

    sendParaclinicos(formState.values.type,formState.values.value, formState.values.comment, localStorage.getItem('p_id'));
    
    formState.values.type = "";
    formState.values.value = "";
    formState.values.comment = "";
    history.push("/menu");
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
                xs={4}
            >
              <TextField
                fullWidth
                error={hasError('tipo')}
                select
                label="Tipo de paraclinico"
                margin="dense"
                name="type"
                onChange={handleChange}
                value={formState.values.type || ''}
                required
                variant="outlined"
              >
                {typeP.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            
            <Grid
              item
              xs={3}
            >
              <TextField
                fullWidth
                error={hasError('value')}
                label="Valor"
                margin="dense"
                name="value"
                onChange={handleChange}
                value={formState.values.value || ''}
                required
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={5}
            >
              <TextField
                fullWidth
                error={hasError('comentario')}
                label="Comentario"
                margin="dense"
                name="comment"
                onChange={handleChange}
                value={formState.values.comment || ''}
                required
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