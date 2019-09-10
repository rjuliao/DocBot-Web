import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Card, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    buttonbase: {
        margin: '10px',
        width: 200,
        height: 50,
        color: '#3F51B5'

    }
}));



const MenuButtons = props =>{
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Card>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    
                    <Grid
                        item
                        xs={3}
                    >
                        <Button
                            fullWidth
                            color="primary"
                            className={classes.buttonbase}
                        >
                            Metas
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                    >
                        <RouterLink to="/dashboard">
                            <Button
                                fullWidth
                                color="primary"
                                className={classes.buttonbase}
                            >
                                Gráficos y Avances
                            </Button>
                        </RouterLink>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                    >
                        <Button
                            fullWidth
                            color="primary"
                            className={classes.buttonbase}
                        >
                            Paraclínicos
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                    >
                        <Button
                            fullWidth
                            color="primary"
                            className={classes.buttonbase}
                        >
                            Modelo Bayesiano
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};


export default MenuButtons;