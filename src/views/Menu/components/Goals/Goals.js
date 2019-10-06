import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
//import mockData from './data';
import { GoalsCard } from './components';

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

  //const [users] = useState(mockData);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    console.log(state.checkedB==true)
  };

  return (
    <div className={classes.root}>
      
      <div className={classes.content}>
        <GoalsCard /> 
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
