import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { UserListToolbar, UserCard, UserTable } from './components';
import { getPatients } from '../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));


const Users = props => {
  const {location, showinfo} = props;
  const classes = useStyles();


  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    data: [],
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  /**
   * Obtengo la lista de pacientes
   */
  const handleUsers = () => {
    console.log(localStorage.getItem("id"));
    
    getPatients(localStorage.getItem("id"))
    .then(response => {
      return response.json();
    })  
    .then(json => {
      console.log(JSON.stringify(json));
      state.data = json;
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  

  return (
    <div className={classes.root} > 
      {handleUsers()} 
      <UserListToolbar/>
      <div className={classes.content} >
        <FormControlLabel
          control={<Checkbox
              checked={state.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
            
          }
          label="Ver forma de lista"
        />
      </div>
      <div 
        className={classes.content} 
        
      >
        {!state.checkedB?
          <Grid
            container
            spacing={3}
          >
              {state.data.map(user => (
                <Grid
                  item
                  key={user.id}
                  lg={4}
                  md={6}
                  xs={12}
                > 
                  <UserCard user={user} />
                </Grid>))}
          </Grid>:
          <UserTable users={state.data} />
        }
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Users;
