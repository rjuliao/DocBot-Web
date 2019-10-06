import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
        <div className={classes.root}>
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
                        {user.name} {user.lastName}
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
                        Identificación: {user.documentType}: {user.documentNumber}
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Sexo: {user.sex == 'f' ? "Mujer":"Hombre"}
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Fecha de Nacimiento: {user.birthdate}                        
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
                        Peso: {user.weight}kg
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Estatura: {user.height}m
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        ICM: {user.weight/Math.pow(user.height,2)}
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
                        {user.clinicalContext}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}

InformationCard.propTypes = {
    user: PropTypes.any.isRequired,
};


export default InformationCard;