import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, Typography } from '@material-ui/core';


import { InformationCard, MenuButtons } from './components';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    buttonbase: {
        width: 200,
        height: 50,
        color: '#3F51B5'

    }
}));




const Menu = props =>{
    const { location } = props
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                
                <Grid
                    item
                    xs={12}
                >
                    <MenuButtons/>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <InformationCard user={location.info.nombre}/>
                </Grid>
            </Grid>
        </div>
    );
};


export default Menu;