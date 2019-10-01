import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { UserListToolbar, UserCard, UserTable } from './components';
import mockData from './data-user';
import { getPatients } from '../../services/api';
import SignIn from '../SignIn/';

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

  var [users] = useState(mockData);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    console.log(state.checkedB==true)
  };

  const handleUsers = () => {
    console.log(localStorage.getItem("id"))

    getPatients(localStorage.getItem("id"))
    .then(response => {
      return response.json();
    })  
    .then(json => {
      //console.log(JSON.stringify(json));
      users = json;
      console.log(users);
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  

  return (
    <div className={classes.root} > 
      {localStorage.getItem("isLogTrue")? 
        console.log(localStorage.getItem("isLogTrue")):<SignIn/>}
      <UserListToolbar/>
      <div className={classes.content}>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Ver lista"
        />
      </div>
      <div className={classes.content} onLoad={handleUsers()}>
        {!state.checkedB?
          <Grid
            container
            spacing={3}
          >
              {users.map(user => (
                <Grid
                  item
                  key={user.id}
                  lg={4}
                  md={6}
                  xs={12}
                > 
                  <UserCard user={user} />
                </Grid>
              ))}
          </Grid>:
          <UserTable users={users} />
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
