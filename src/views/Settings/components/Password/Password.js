import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import { changePass } from '../../../../services/api';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Password = props => {
  const { className,history, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  
  /****************Acá se toma la información del usuario*********************/
  const handleChangePws = event => {
  
      if(values.password === values.confirm){

        changePass(localStorage.getItem('email'), values.password)
        .then(response => {
          return response.json();
        })
        .then(json => {

          localStorage.removeItem("token")
          history.push('/sign-in')
        })
        .catch(error => {
          console.log(error.message);
        });

      }else{
        window.confirm("Las constraseñas NO coinciden")
      }
  


  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Cambiar contraseña"
          title="Contraseña"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmar contraseña"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleChangePws()}
          >
            Actualizar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
