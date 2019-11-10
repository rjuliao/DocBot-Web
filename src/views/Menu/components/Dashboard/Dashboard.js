import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Steps,
  WeightChange,
  GoalsProgress,
  GlucoseLevel,
  SingleGoalProgress,
  WeightHistory,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
  }
}));

const Dashboard = props => {
  const {data, goals, goalP} = props
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Steps />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <WeightChange />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <GoalsProgress progress= {goalP} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <GlucoseLevel />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <WeightHistory data = {data}/>
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={12}
          xs={12}
        >
          <SingleGoalProgress goals={goals} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;