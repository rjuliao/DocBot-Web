import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import logo from '../../../../assets/logos/name-logo.jpeg';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    backgroundColor:  '#1438A6',
  },
  imageprop: {
    width: 88,
  },
  quote: {
    color: '#D92588',
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src={logo} className={classes.imageprop} /> 
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
