import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
import SingleGoal from './SingleGoal/SingleGoal';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const SingleGoalProgress = props => {
  const { goals } = props;

  const classes = useStyles();

  return (
  
    <div className={classes.chartContainer}>
      
      <Grid
        container
        spacing={3}
      >
        {goals.map(goal => (
          <Grid
            item
            key={goal.id}
            lg={4}
            md={6}
            xs={12}
          > 
            <SingleGoal goal={goal} />
          </Grid>))}
        
      </Grid>
    </div>
  );
};

SingleGoalProgress.propTypes = {
  className: PropTypes.string,
};

export default SingleGoalProgress;

/**
 * {goals.map(user => (
              <Grid
                item
                key={user.id}
                lg={4}
                md={6}
                xs={12}
              > 
                {/*<SingleGoal goals={goals} />
                </Grid>))}
 */