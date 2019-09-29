import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Divider, Typography, Grid } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    root: {
    },
    title: {
        marginBottom: '10px',
        color: '#1438A6'

    },
    subttitle: {
        marginBottom: '5px'
    },
    infoTop: {
        marginTop: '10px',
        color: "#3F51B5"
    },
    info: {
        margin: '10px',
        padding: 'initial'
    }
}));

const InformationCard = props => {
    const { user } = props
    const classes = useStyles();
    

    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    variant="h1"
                >
                    Información del Paciente
                </Typography>
                <Typography
                    className={classes.subttitle}
                    variant="subtitle1"
                >
                    Datos personales
                </Typography>
                <Divider/>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            className={classes.infoTop}
                            variant="h2"
                        >
                            {user.name}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Typography
                            className={classes.info}
                            variant="h6"
                        >
                            Edad: {user.age}
                        </Typography>
                        <Typography
                            className={classes.info}
                            variant="h6"
                        >
                            E-mail: {user.email}
                        </Typography>
                        <Typography
                            className={classes.info}    
                            variant="h6"
                        >
                            Identificación: {user.id}
                        </Typography>
                        <Typography
                            className={classes.info}    
                            variant="h6"
                        >
                            Sexo: Hombre
                        </Typography>
                        <Typography
                            className={classes.info}    
                            variant="h6"
                        >
                            Fecha de Nacimiento: {user.date}                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <Typography
                            className={classes.info}    
                            variant="h6"
                        >
                            Peso: 85kg
                        </Typography>
                        <Typography
                            className={classes.info}    
                            variant="h6"
                        >
                            Estatura: 1.75m
                        </Typography>
                        <Typography
                            className={classes.info}    
                            variant="h6"
                        >
                            ICM: 28.332515496
                        </Typography>
                    </Grid>
                </Grid>
                <Divider/>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            className={classes.infoTop}
                            variant="h2"
                        >
                            Información Médica
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <Typography
                            className={classes.info}
                            variant="subtitle1"
                        >
                            Información médica al momento del ingreso al sistema
                        </Typography>
                        <Typography
                            className={classes.info}    
                            variant="body1"
                        >
                            ILorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                             non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}


export default InformationCard;