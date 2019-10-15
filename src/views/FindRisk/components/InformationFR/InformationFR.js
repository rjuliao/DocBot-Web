import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    textAlign: 'center',
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  title: {
    marginBottom: '10px',
    color: '#1438A6',
    textAlign: 'center'
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const InformationFR = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/avatars/avatar_11.png'
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid container justify="center" alignItems="center">
          <Avatar
            className={classes.avatar}
         
          />
        </Grid>
      </CardContent>
      <Divider />
      <CardContent className={classes.title} variant="h3">
          FINDRISK
      </CardContent>
    </Card>
  );
};

InformationFR.propTypes = {
  className: PropTypes.string
};

export default InformationFR;
