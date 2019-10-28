import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';
import bcimage from '../../assets/logos/background.jpg';
import botic from '../../assets/logos/name.jpeg';
import { signIn } from '../../services/api';
import { connect } from 'react-redux';
import getDoctor from '../../redux/actions/getDoctor';


const schema = {
  email: {
    presence: { allowEmpty: false, message: 'es obligatorio' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'es obligatorio' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
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
    backgroundImage: 'url(./bgImage/logo.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: '#3F51B5',
    fontWeight: 300
  },
  
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
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

const SignIn = props => {
  const { doctor, history, logVal} = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  /***************Esta funcioón toma los valores en los textfields****************/
  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;


  /**
   * El médico se loguea 
   * @param {*} email 
   * @param {*} password 
   */
  const login = (email, password) =>{
    signIn(email,password)
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json["login"] == true) {
          props.getDoctor(json);
          localStorage.setItem('name', json["name"])
          localStorage.setItem('lastName', json["lastName"]);
          localStorage.setItem('medicalCenter', json["medicalCenter"])
          localStorage.setItem('id', json["id"])
        
          window.confirm("Ingreso exitoso, bienvenido")
          history.push('/pacientes');
        } else {

          window.confirm("Error en ingreso, porfavor verifique sus credenciales")
        }
      })
      .catch(error => {
        console.log(error.message);
        
      });
  };

  /****************Acá se toma la información del usuario*********************/
  const handleSignIn = event => {
    event.preventDefault();
    login(formState.values.email, formState.values.password);
  };

  const loginVal = () =>{
    localStorage.setItem("isLogTrue", false)
    console.log(localStorage.getItem("isLogTrue"))
  };

  return (
    <div className={classes.root} onLoad={loginVal()}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <Card >
            <CardMedia
              component="img"
              image={bcimage}  
            />
            <CardContent className={classes.quoteInner}>
              <Typography
                  className={classes.quoteText}
                  variant="h1"
                >
                  DocBot es una herramienta que te ayuda a monitorear tus pacientes desde cualquier lugar
                </Typography>
            </CardContent>
          </Card>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              
              
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
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Iniciar Sesión
                </Typography>
                
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  
                  label="Contraseña"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  INICIAR SESIÓN
                </Button>
                <Typography
                  color="#D92588"
                  variant="body1"
                >
                  Nuevo en DocBot?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                  >
                    Registrarme
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
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
const component = wrapper(SignIn)

export default withRouter(component);
