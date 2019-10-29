import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Grid
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { data, options } from './chart';

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

const LatestSales = props => {
  const { className, goals, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            size="small"
            variant="text"
          >
            Last 7 days <ArrowDropDownIcon />
          </Button>
        }
        title="Progreso de metas"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          
          <Grid
            container
            spacing={3}
          >
            
          </Grid>
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string,
};

export default LatestSales;

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