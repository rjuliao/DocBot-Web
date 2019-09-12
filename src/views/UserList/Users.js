import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { UserListToolbar, UserCard } from './components';
import mockData from './data-user';

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
  const {location} = props;
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      
      <UserListToolbar  />
      <div className={classes.content}>
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
        </Grid>
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
