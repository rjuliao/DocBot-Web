import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { GoalsCard, TableContent } from './components';
import GoalsToolbar from './components/GoalsToolbar';

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
  const {goals, showinfo} = props;
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <GoalsToolbar/>
      </div>
      <div className={classes.content}> 
        <TableContent goals={goals}/>
      </div>
    </div>
  );
};

export default Users;
