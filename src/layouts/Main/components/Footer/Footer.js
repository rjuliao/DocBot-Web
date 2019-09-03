import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, Grid } from '@material-ui/core';
import logo from './images/headerlogo_un.png';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  link: {
    color: '#D92588',
  },
  logoun: {
    width: 150,
  },
  grid: {
    height: '100%'
  },
}));

const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          target="_blank"
          className={classes.link}
        >
          Botic!
        </Link>
        . 2019
      </Typography>
      <div>
        <Grid className={classes.grid} container>
          <Grid item>
            <Typography variant="caption">
              Creado por estudiantes de ingeniería de sistemas en colaboración con estudiantes de medicina.<br/>
              Universidad del Norte.
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign: "right"}}>
            <img
              src={logo}
              className={classes.logoun}
            />
          </Grid>
        </Grid> 
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
