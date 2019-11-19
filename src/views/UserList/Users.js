import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {  Grid, FormControlLabel, Checkbox } from '@material-ui/core';
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
    
    getPatients(localStorage.getItem("id"))
    .then(response => {
      return response.json();
    })  
    .then(json => {
      console.log(json)
      state.data = json;
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  return (
    <div className={classes.root} > 
      {window.onload = handleUsers()} 
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
      
    </div>
  );
};

export default Users;
