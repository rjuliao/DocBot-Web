import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
} from '@material-ui/core';

import {  options } from './chart';

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

const ClsHistorico = props => {
  const { className, data, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Historico de tomas en Colesterol total"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Line
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        
      </CardActions>
    </Card>
  );
};

ClsHistorico.propTypes = {
  className: PropTypes.string,
  weight: PropTypes.array.isRequired
};

export default ClsHistorico;
