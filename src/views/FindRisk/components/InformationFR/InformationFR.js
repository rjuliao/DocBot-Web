import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Grid
} from '@material-ui/core';
import logo from '../../../../assets/logos/logo.png';

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

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid container justify="center" alignItems="center">
          <Avatar
            className={classes.avatar}
            src={logo}
          />
        </Grid>
      </CardContent>
      <Divider />
      <CardContent className={classes.title} >
          <Typography variant="h1" color="primary">
            FindRisk Test
          </Typography>
      </CardContent>
    </Card>
  );
};

InformationFR.propTypes = {
  className: PropTypes.string
};

export default InformationFR;
