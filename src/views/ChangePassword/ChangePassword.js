import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import getDoctor from '../../redux/actions/getDoctor';
import { PswForm } from './Components';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  imageprop: {
    width: 300,
    paddingTop: theme.spacing(3),
    justifyContent: 'center',
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'bottom',
    backgroundImage: 'url(/images/background.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px',
  },
  quoteText: {
    color:  theme.palette.primary.main,
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',  
    fontWeight: 300
  },
  
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3),
    color: '#1438A6',
    textAlign: 'center'
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2),
    color: '#D92588',
  },
  textField: {
    marginTop: theme.spacing(2),
    color: '#D92588',
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  }
}));

const ChangePassword = props => {

  const classes = useStyles();


  return (
    <div className={classes.root} >
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                DocBot es una herramienta que te ayuda a monitorear tus pacientes desde cualquier lugar
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            
            <div className={classes.contentBody}>
            
              <PswForm/>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ChangePassword.propTypes = {
  history: PropTypes.object
};

/**
 * Regresa funciones que son acciones
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) =>{
  return{
    getDoctor : (doctor) => dispatch(getDoctor(doctor)),
  }
}

const mapStateToProps = (state) =>{
  return{
    doctor: state.doctor,
  };
}

const wrapper = connect(mapStateToProps, mapDispatchToProps);
const component = wrapper(ChangePassword)

export default withRouter(component);
