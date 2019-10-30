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

const MessageCard = props => {
  const { className, message, ...rest } = props;

  const classes = useStyles();


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >

        <CardActionArea >
          <CardContent>
            <Typography 
              align="center"
              gutterBottom
              variant="h4"
              className={classes.quote}
            >
              {message.subject}
            </Typography>
            <Typography
              align="center"
              variant="body1"
            >
              {message.description}
            </Typography>
            
          </CardContent>
        </CardActionArea>
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
                    Enviado el: {moment(message.date).format('DD/MM/YYYY')}
                </Typography>
            </Grid>
            </Grid>
        </CardActions>
    </Card>
  );
};

MessageCard.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired,
};

export default MessageCard;
