import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import logo from '../../../../assets/logos/name.jpeg';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor:  theme.palette.primary,
    
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  imageprop: {
    width: 100,
    height: 30
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const handleLogout = () => {
      localStorage.clear();
  }


  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img src={logo} className={classes.imageprop}/>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <RouterLink to = '/sign-in'>
            <IconButton  onClick={handleLogout}>
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <ClearIcon />
              </Badge>
            </IconButton>
          </RouterLink>
        </Hidden>
        
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
