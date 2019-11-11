import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/Queue';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import validate from 'validate.js';
import moment from 'moment';
import { setGoal, getGoalsP } from '../../../../../../../../services/api';


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

const AddPredefinida = props => {
  const { className, ...rest } = props;
  
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [state] = React.useState({
    data: [],
  });

  const handleClickOpen = () => {
    getGoalsP()
    .then(response => {
      return response.json();
    })  
    .then(json => {
      state.data = json;
      setOpen(true);
    })
    .catch(error => {
      console.log(error.message);
    });
  };

  const handleClose = () => {
      setOpen(false);
  };


  /***********************************EDITAR UNA META****************************************/
  const [openGoal, setOpenGoal] = React.useState(false);

  const handleClickOpenGoal = value => () => {

    localStorage.setItem('temp', value)
    setOpenGoal(true);
  };

  const handleCloseGoal = () => {
    setOpenGoal(false);
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
  const writeGoal = (description, status, quantity, 
    frequency, idpatien, dueDate, progress, tag, nMes, cDate) =>{
    
    setGoal(description, status, quantity, frequency,
       idpatien, dueDate, progress, tag, nMes, cDate)
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

    writeGoal(localStorage.getItem('temp'), formState.values.status, formState.values.quantity,
        formState.values.freq,  localStorage.getItem('p_id'), formState.values.dueDate, 0, 
        "No Predeterminada", "", moment().format('DD/MM/YYYY')  );
    handleCloseGoal();
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
       
      
      <Fab  variant="extended" onClick={handleClickOpen} className={classes.addButton}>
        <PostAddIcon className={classes.addIcon}/>
        Añadir meta predefinida
      </Fab>
          
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Añadir una meta</DialogTitle>
        <DialogContent>
        <List className={classes.root}>
            {state.data.map(value => {
                const labelId = `checkbox-list-label-${value.id}`;

                return (
                <ListItem 
                    key={value.id} 
                    role={undefined} 
                    dense button 
                    onClick={handleClickOpenGoal(value.description)}
                >
                    <ListItemIcon>
                        <AddAlertIcon/>
                    </ListItemIcon>
                    <ListItemText 
                        id={labelId} 
                        primary={`Meta: `} 
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {value.description}
                                </Typography>
                            </React.Fragment>
                        } 
                        />
                </ListItem>
                );
            })}
        </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
              Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openGoal} onClose={handleCloseGoal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Añadir meta predefinida</DialogTitle>
        <DialogContent>
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
                    <Typography
                        variant='h5'
                    >
                        {localStorage.getItem('temp')}
                    </Typography>
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
        </DialogContent>
        <DialogActions>
            <Button onClick={handleGoal} color="primary">
                Añadir meta al paciente
            </Button>
            <Button onClick={handleCloseGoal} color="primary">
                Cancelar
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddPredefinida.propTypes = {
  className: PropTypes.string
};

export default AddPredefinida;
