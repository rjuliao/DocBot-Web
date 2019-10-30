import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  CardActionArea
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import logo from '../../../../assets/logos/logo.png';
import { getFindriskVal, getMedicalInfos } from '../../../../services/api';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  quote: {
    color: '#1438A6'
  }
}));

const UserCard = props => {
  const { className, user, ...rest } = props;

  const classes = useStyles();

  /**
   * Esto debe ser cambiado!!
   * @param {*} userr 
   */
  const handleUser = userr =>{
    localStorage.removeItem('p_id');
    localStorage.removeItem('p_Name');
    localStorage.removeItem('p_lName');
    localStorage.removeItem('p_medicalCenter');
    localStorage.removeItem('p_dateAssociation');
    localStorage.removeItem('p_birthdate');
    localStorage.removeItem('p_documentType');
    localStorage.removeItem('p_documentNumber');
    localStorage.removeItem('p_weight');
    localStorage.removeItem('p_height');
    localStorage.removeItem('p_clinicalContext');
    localStorage.removeItem('p_sex');
    localStorage.removeItem('p_vtf');
    localStorage.removeItem('p_vtf');
    localStorage.removeItem('p_clinicalC');
    localStorage.removeItem('p_mecialC');
    localStorage.removeItem('p_isDiabetic');

    var l = userr.weight.length
    var w = userr.weight[l-1]

    if (l>1){
      var old = userr.weight[l-2];
      var oldv = old.value
    }
    if (l <= 1){
      var oldv = 0
      
    }

    localStorage.setItem('p_id', userr._id);
    localStorage.setItem('p_Name', userr.name);
    localStorage.setItem('p_lName', userr.lastName);
    localStorage.setItem('p_age', userr.age);
    localStorage.setItem('p_dateAssociation', userr.dateAssociation);
    localStorage.setItem('p_birthdate', userr.birthdate);
    localStorage.setItem('p_documentType', userr.documentType);
    localStorage.setItem('p_documentNumber', userr.documentNumber);
    localStorage.setItem('p_weight', w.value);
    localStorage.setItem('p_wold', oldv);
    localStorage.setItem('p_height', userr.height);
    localStorage.setItem('p_sex', userr.sex);


    console.log(userr._id)
    getMedicalInfos(userr._id)
    .then(response => {
      return response.json();
    })  
    .then(json => {
      console.log(json)
      localStorage.setItem('p_vtf', json.testFindRisk);
      localStorage.setItem('p_clinicalC', json.clinicalContext);
      localStorage.setItem('p_mecialC', json.medicalCenter);
      localStorage.setItem('p_isDiabetic', json.isDiabetic);
    })
    .catch(error => {
      console.log(error.message);
    });

  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <RouterLink 
        to={{
          pathname:"/menu",
          info:{ nombre: user}
        }}
      >
        <CardActionArea onClick={()=>handleUser(user)}>
          <CardContent>
            <div className={classes.imageContainer}>
              <img
                alt="Product"
                className={classes.image}
                src={logo}
              />
            </div>
            <Typography 
              align="center"
              gutterBottom
              variant="h4"
              className={classes.quote}
            >
              {user.name} {user.lastName}
            </Typography>
            <Typography
              align="center"
              variant="body1"
            >
              Centro medico: {user.medicalCenter}
            </Typography>
            
          </CardContent>
        </CardActionArea>
      </RouterLink>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Ingresado el: {moment(user.dateAssociation).format('DD/MM/YYYY')}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

UserCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  user: PropTypes.any.isRequired
};

export default UserCard;
