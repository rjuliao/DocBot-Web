import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Divider,
  Button,
  Grid
} from '@material-ui/core';
import logo  from '../../../../assets/logos/logo.png';
import { Link as RouterLink } from 'react-router-dom';

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
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
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
      <CardActions>
        <RouterLink
          to="/pacientes"
        >
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Cancelar
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
