import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  Fab
} from '@material-ui/core';
import Add from '@material-ui/icons/AddCircleOutline';
import { SearchInput } from '../../../../../../components';
import validate from 'validate.js';
import { setGoal } from '../../../../../../services/api';


const status = [
  {
    value: 0,
    label: ''
  },
  {
    value: '2',
    label: 'Asignado'
  }
];

const freq = [
  {
    value: 0,
    label: ''
  },
  {
    value: 1,
    label:  'Cada Hora'
  }, 
  { 
    value: 2,
    label: 'Diariamente',
 
  },
  {   
    value: 3,
    label: 'Semanal', 
  },
  {
    value: 4,
    label: 'Mensual'
  }
];

const typefreq = [
  {
    value: 0,
    label: ''
  },
  {
    value: 1,
    label: 'Alta'
  },
  {
    value: 2,
    label: 'Media'
  },
  {
    value: 3,
    label: 'Baja'
  }
];

const typeMessage = [
  {
    value: 0,
    label: ''
  },
  {
    value: 1,
    label: 'Amable'
  },
  {
    value: 2,
    label: 'Asertivo'
  },
];

const intensidad = [
  {
    value: 0,
    label: ''
  },
  {
    value: 1,
    label: 'Alta'
  },
  {
    value: 2,
    label: 'Media'
  },
  {
    value: 3,
    label: 'Baja'
  }
];

const schema = {
  description: {
    presence: { allowEmpty: false, message: 'Obligatorio' },
    length: {
      maximum: 120
    }
  },
  quantity: {
    presence:{ allowEmpty: false, message: 'Obligatorio'},
    length:{
      maximum: 2
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  addButton: {
    backgroundColor: '#1438A6',
    color: '#F2F2F2',
    margin: theme.spacing(1),
  },
  addIcon: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const GoalsToolbar = props => {
  const { className, ...rest } = props;
  
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

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

  const handleEdit = event =>{
      event.preventDefault();
      console.log(formState.values.name)
  }


  //-------------------------------------------------------------------------------------------
  const writeGoal = (description, status, quantity, typeFrequency, 
    frequency, intensityLevel, typeMessage, idpatien, dueDate, progress, tag, nMes, cDate) =>{
    
    setGoal(description, status, quantity, typeFrequency, frequency, 
      intensityLevel, typeMessage, idpatien, dueDate, progress, tag, nMes, cDate)
    .then(response => {
      return response.json();
    })  
    .then(json => {
    })
    .catch(error => {
        console.log(error.message);
    });
  }

  const handleGoal = event =>{
    writeGoal(formState.values.description, formState.values.status, formState.values.quantity,
       formState.values.freqtype, formState.values.freq, formState.values.intensidad,
        formState.values.typeMessage, localStorage.getItem('p_id'), formState.values.dueDate, 0, 
        "No Predeterminada", "", ""  )
  }


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        
        <span className={classes.spacer} />
  
          <Fab  variant="extended" onClick={handleClickOpen} className={classes.addButton}>
            <Add className={classes.addIcon}/>
            Añadir meta
          </Fab>
          
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Añadir una meta</DialogTitle>
        <DialogContent>
        <Card>
            <form
              autoComplete="off"
              noValidate
              onSubmit={handleEdit}
            >
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                      error={hasError('description')}
                      fullWidth
                      label="Descripción"
                      margin="dense"
                      name="description"
                      onChange={handleChange}
                      value={formState.values.description || ''}
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
                      label="Fecha de inicio"
                      margin="dense"
                      name="date"
                      onChange={handleChange}
                      value={formState.values.date || ''}
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
                      label="Fecha de fin"
                      margin="dense"
                      name="dueDate"
                      onChange={handleChange}
                      value={formState.values.dueDate || ''}
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
                      select
                      label="Estado de la meta"
                      margin="dense"
                      name="status"
                      onChange={handleChange}
                      value={formState.values.status || ''}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      
                      variant="outlined"
                    >
                      {status.map(option => (
                        <option key={option.value} value={option.value}>
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
                      error={hasError('quantity')}
                      label="Cantidad"
                      margin="dense"
                      name="quantity"
                      onChange={handleChange}
                      value={formState.values.quantity || ''}
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
                      select
                      label="Frecuencia"
                      margin="dense"
                      name="freq"
                      onChange={handleChange}
                      value={formState.values.freq || ''}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      
                      variant="outlined"
                    >
                      {freq.map(option => (
                        <option key={option.value} value={option.value}>
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
                      select
                      label="Tipo de frecuencia"
                      margin="dense"
                      name="freqtype"
                      onChange={handleChange}
                      value={formState.values.freqtype || ''}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      
                      variant="outlined"
                    >
                      {typefreq.map(option => (
                        <option key={option.value} value={option.value}>
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
                      select
                      label="Tipo de mensaje"
                      margin="dense"
                      name="typeMessage"
                      onChange={handleChange}
                      value={formState.values.typeMessage || ''}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      
                      variant="outlined"
                    >
                      {typeMessage.map(option => (
                        <option key={option.value} value={option.value}>
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
                      select
                      label="Intensidad"
                      margin="dense"
                      name="intensidad"
                      onChange={handleChange}
                      value={formState.values.intensidad || ''}
                      required
                      select
                      // eslint-disable-next-line react/jsx-sort-props
                      SelectProps={{ native: true }}
                      
                      variant="outlined"
                    >
                      {intensidad.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  
                </Grid>
              </CardContent>
            </form>
        </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoal} color="primary">
            Agregar meta
          </Button>
          <Button onClick={handleClose} color="primary">
              Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

GoalsToolbar.propTypes = {
  className: PropTypes.string
};

export default GoalsToolbar;
