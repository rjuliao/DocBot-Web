import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  CardActionArea,
  CardMedia
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const useStyles = makeStyles(theme => ({
    root: {},
    imageContainer: {
        height: 90,
        width: 90,
        margin: '0 auto',
        border: `1px solid ${theme.palette.divider}`,
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
    },
    circular: {
        height: '100px'
    },
    
    media: {
        height: 0,
        paddingTop: '10px', // 16:9
    },
}));

const SingleGoal = props => {
  const { className, goal, ...rest } = props;

  const classes = useStyles();

  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    > 
        <CardActionArea>
            <CardContent>
                <div className={classes.imageContainer}>
                    <CircularProgressbar
                        strokeWidth={3}
                        className={classes.circular}
                        value={(goal.progress/goal.quantity)*100}
                        text={`${(goal.progress/goal.quantity)*100}%`}
                        circleRatio={0.75}
                        styles={buildStyles({
                            rotation: 1 / 2 + 1 / 8,
                            strokeLinecap: 'butt',
                            trailColor: '#eee',
                            pathColor: 'green',
                            textColor: 'grey'
                        })}
                    />
                </div>
                <Typography 
                    align="center"
                    gutterBottom
                    variant="h4"
                    className={classes.quote}
                >
                    {goal.description}
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
                Vence el: {moment(goal.dueDate).format('DD/MM/YYYY')}
                </Typography>
            </Grid>
            </Grid>
        </CardActions>
    </Card>
  );
};

SingleGoal.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  goal: PropTypes.any.isRequired
};

export default SingleGoal;