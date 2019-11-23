import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Fab
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import validate from 'validate.js';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { setGoal, setGoalsP } from '../../../../../../../../services/api';

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

const schema = {
  description: {
    presence: { allowEmpty: false, message: 'Obligatorio' },
    length: {
      maximum: 120
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
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
  },
  Button: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.white
  }
}));

const AddGoalBtn = props => {
  const { history, className, ...rest } = props;

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

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  //-------------------------------------------------------------------------------------------
  const writeGoal = (description, status, quantity, 
    frequency, idpatien, dueDate, progress, tag, nMes, cDate) =>{
    
    setGoal(description, status, quantity, frequency,
       idpatien, dueDate, progress, tag, nMes, cDate,"")
    .then(response => {
      return response.json();
    })  
    .then(json => {
      setGoalsP(description)
      .then(response => {
        return response.json();
      })  
      .then(json => {
        history.push('/menu')
      })
      .catch(error => {
          console.log(error.message);
      });
    })
    .catch(error => {
        console.log(error.message);
    });
  }

  const handleGoal = event =>{

    writeGoal(formState.values.description, '2', formState.values.quantity,
        formState.values.freq,  localStorage.getItem('p_id'), moment(formState.values.dueDate).format("DD/MM/YYYY"), 0, 
        "No Predeterminada", "", moment().format('DD/MM/YYYY'))
  
    handleClose()
  }


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
       
      
      <Fab  variant="extended" onClick={handleClickOpen} className={classes.addButton}>
        <AddCircleOutlineIcon className={classes.addIcon}/>
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
                      type="text"
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
                      disabled
                      defaultValue={moment().format('DD/MM/YYYY')}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          disableToolbar
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Fecha de finalización"
                          value={selectedDate}
                          onChange={handleDateChange}
                          minDate={new Date()}
                          variant="outlined"
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
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
                </Grid>
              </CardContent>
            </form>
        </Card>
        </DialogContent>
        <DialogActions>
          <Button 
            className={classes.Button}
            onClick={handleGoal} 
            disabled={!formState.isValid}
            color="primary"
            variant="contained"
          >
            Agregar meta
          </Button>
          <Button 
            onClick={handleClose} 
            color="primary"
            variant="contained"
          >
              Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddGoalBtn.propTypes = {
  className: PropTypes.string
};

export default AddGoalBtn;
