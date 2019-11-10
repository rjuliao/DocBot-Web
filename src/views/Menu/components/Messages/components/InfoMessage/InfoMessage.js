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
import Send from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import { setMessages } from '../../../../../../services/api';

const schema = {

  comentario: {
    presence: { allowEmpty: false, message: 'Obligatorio' },
    length: {
      maximum: 50
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

const InfoMessage = props =>{
  const { history} = props;
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

  const handleMessage = (idP, idDoc, nombre, mensaje, asunto, date) => {
    
    setMessages(mensaje, date, idP, idDoc, nombre, asunto)
    .then(response => {
      return response.json();
    })  
    .then(json => { 
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

    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth()+1; //hoy es 0!
    var yyyy = date.getFullYear();
    
    if(dd<10) {
        dd='0'+dd
    } 
    
    if(mm<10) {
        mm='0'+mm
    } 
    
    date = mm+'/'+dd+'/'+yyyy;

    var nombre = localStorage.getItem("name") + " " + localStorage.getItem("lastName") 
    
    handleMessage(localStorage.getItem("p_id"), localStorage.getItem("id"),
     nombre,formState.values.message,  formState.values.subject,  date)
    
    formState.values.message=""
    formState.values.subject=""
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
          subheader="Ingresar mensaje para el paciente"
          title="Mensajes"
        />
        <Divider/>
        <CardContent>
          <Grid
            container
            justify = "center"
            
            alignItems="center"
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                error={hasError('comentario')}
                label="Asunto"
                margin="dense"
                name="subject"
                onChange={handleChange}
                value={formState.values.subject || ''}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid
              item
              xs={10}
            >
              <TextField
                fullWidth
                error={hasError('comentario')}
                label="Mensaje"
                margin="dense"
                name="message"
                onChange={handleChange}
                value={formState.values.message || ''}
                required
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={2}
            >
              <Fab  
                color="primary"
                type="submit"
                variant="contained"
                onClik={handleData}
              >
                <Send className={classes.buttonbase}/>
                Enviar
              </Fab>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions >
          
        </CardActions>
      </form>
    </Card>
  )
}
InfoMessage.propTypes = {
  user: PropTypes.isRequired,
  history: PropTypes.object
};
export default withRouter(InfoMessage);