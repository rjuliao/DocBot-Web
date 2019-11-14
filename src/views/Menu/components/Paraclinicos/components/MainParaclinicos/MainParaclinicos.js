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
        Fab} from '@material-ui/core';
import AddButton from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/styles';
import { setParaclinico } from '../../../../../../services/api';
import moment from 'moment';

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
  const { history } = props;
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


  const sendParaclinicos = (type, value, comment, id, date) => {
  
    setParaclinico(type, value, comment, id, date)
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

    
    sendParaclinicos(formState.values.type, formState.values.value, formState.values.comment, 
      localStorage.getItem('p_id'), moment().format('DD/MM/YYYY'));
    
    if(formState.values.type === 'trigliceridos'){
   
      localStorage.setItem("tri", formState.values.value)
      localStorage.setItem("tri_C", formState.values.comment)
    }
    if(formState.values.type === 'glicemia'){
      
      localStorage.setItem("gli", formState.values.value)
      localStorage.setItem("gli_C",  formState.values.comment)
    }
    if(formState.values.type === 'hemoglobina_glicosilada'){
      
      localStorage.setItem("hg", formState.values.value)
      localStorage.setItem("hg_C",  formState.values.comment)
    }
    if(formState.values.type === 'colesterol_total'){
     
      localStorage.setItem("clt", formState.values.value)
      localStorage.setItem("clt_C",  formState.values.comment)
    }

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
                lg={3}
                sm={6}
                xl={3}
                xs={12}
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
              lg={3}
              sm={6}
              xl={3}
              xs={12}
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
              lg={6}
              md={6}
              xl={3}
              xs={12}
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