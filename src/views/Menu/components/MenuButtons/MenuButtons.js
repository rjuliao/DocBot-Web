import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Card, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
    root: { 
        marginTop: '5px',
    },
    buttonbase: {
        margin: '10px',
        width: 200,
        height: 50,
        color: '#F4F6F8'

    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center'
    },
    spacer: {
        flexGrow: 1
    },
}));



const MenuButtons = props =>{
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <RouterLink to="/metas">
                    <Button
                        fullWidth
                        variant="contained"
                        size="medium"
                        color="primary"
                        className={classes.buttonbase}
                    >
                        Metas
                    </Button>
                </RouterLink>
                <span className={classes.spacer} />
                <RouterLink to="/dashboard">
                    <Button
                        fullWidth
                        variant="contained"
                        size="medium"
                        color="primary"
                        className={classes.buttonbase}
                    >
                        Gráficos y Avances
                    </Button>
                </RouterLink>
                <span className={classes.spacer} />
                <Button
                    fullWidth
                    variant="contained"
                    size="medium"
                    color="primary"
                    className={classes.buttonbase}
                >
                    Paraclínicos
                </Button>
                <span className={classes.spacer} />
                <Button
                    fullWidth
                    variant="contained"
                    size="medium"
                    color="primary"
                    className={classes.buttonbase}
                >
                    Chat Bot
                </Button>
            </div>
        </div>
    );
};


export default MenuButtons;