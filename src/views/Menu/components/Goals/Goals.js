import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { TableContent } from './components';
import GoalsToolbar from './components/GoalsToolbar';

const useStyles = makeStyles(theme => ({
  root: {
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
  const {goals} = props;
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <div className={classes.root}>
        <GoalsToolbar/>
      </div>
      <div className={classes.content}> 
        <TableContent goals={goals}/>
      </div>
    </div>
  );
};

export default Users;
