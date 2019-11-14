import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Fab } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link as RouterLink } from 'react-router-dom';
import { Profile, SidebarNav } from './components';
import { connect } from 'react-redux';
import Block from '@material-ui/icons/Block';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  blockIcon: {
    marginRight: theme.spacing(1),
  },
  lobutton:{
    backgroundColor: '#1438A6',
    color: '#F2F2F2',
  }
}));

const Sidebar = props => {
  const { doctor, open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Pacientes',
      href: '/pacientes',
      icon: <PeopleIcon/>
    },

    {
      title: 'Configuraciones',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
  }


  return (
    
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile doctor={doctor}/>
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
      <div className={classes.root}>
        <RouterLink to = '/sign-in'>
          <Fab  
            className={classes.lobutton}
            variant="contained"
            size="large"
            onClick={handleLogout}
          >
            <Block className={classes.blockIcon} />
            Cerrar Sesión
          </Fab>
        </RouterLink>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

/**
 * Accede a los reducers que tengo definidos
 * Cualquier cosa que se regrese va a estar disponible como propiedad en el componente
 * @param {*} state 
 */
const mapStateToProps = (state) =>{
  return{
    doctor: state.doctor,
  };
}

/**Forma 1 
const wrapper = connect(mapStateToProps);
const component = wrapper(Sidebar)
*/


/**
 * De esta forma tenemos conectado el componente a redux
 * Ahora tenemos doctor disponible como un prop 
 */
export default connect(mapStateToProps)(Sidebar);
