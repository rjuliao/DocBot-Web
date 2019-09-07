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
import GetAppIcon from '@material-ui/icons/GetApp';

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

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <RouterLink to="/dashboard">
        <CardActionArea>
          <CardContent>
            <div className={classes.imageContainer}>
              <img
                alt="Product"
                className={classes.image}
                
              />
            </div>
            <Typography 
              align="center"
              gutterBottom
              variant="h4"
              className={classes.quote}
            >
              {user.name}
            </Typography>
            <Typography
              align="center"
              variant="body1"
            >
              Edad: {user.age}
            </Typography>
            <Typography
              align="center"
              variant="body2"
            >
              Email: {user.email}
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
              Ingresado en: {user.date}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

UserCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default UserCard;
