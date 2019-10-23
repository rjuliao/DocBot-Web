import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, CardHeader, 
    Divider, 
    Typography, 
    Grid} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor : "#F4F6F8"
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
    },
    icons: {
        marginRight: theme.spacing(1),
    }
}));

const Information = props => {
    const { history, user } = props
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
                        {localStorage.getItem('p_Name')} {localStorage.getItem('p_lName')}
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
                        Edad: {localStorage.getItem('p_age')}
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Identificación: {localStorage.getItem('p_documentType')}: {localStorage.getItem('p_documentNumber')}
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Sexo: {localStorage.getItem('p_sex')== 'f' ? "Mujer":"Hombre"}
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Fecha de Nacimiento: {localStorage.getItem('p_birthdate')}                        
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
                        Peso: {localStorage.getItem('p_weight')}kg
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        Estatura: {localStorage.getItem('p_height')}m
                    </Typography>
                    <Typography
                        className={classes.info}    
                        variant="h6"
                    >
                        ICM: {(localStorage.getItem('p_weight')/Math.pow(localStorage.getItem('p_height'),2)).toFixed(3)}
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
                        {localStorage.getItem('p_clinicalContext')}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        className={classes.infoTop}
                        variant="h2"
                    >
                        FINDRISK TEST
                    </Typography>
                    <Divider/>
                    {localStorage.getItem('p_vtf')=== null? 
                    <Typography>
                        Este paciente no tiene aplicado el test
                    </Typography>:
                    <Typography
                        className={classes.info}    
                        variant="body1"
                    >
                        {parseInt(localStorage.getItem('p_vtf'),10) > 14 ? 
                        "Su puntaje es: " + localStorage.getItem('p_vtf') +" ¡OJO! Esta por encima en riesgo de desarrollar diabetes"
                        :"Su puntaje es: " + localStorage.getItem('p_vtf') +" Esta por debajo del índice de riesgo para desarrollar diabetes"}
                    </Typography>}
                    <Typography
                        className={classes.info}    
                        variant="subtitle2"
                    >
                        El test FINDRISK no puede reemplazar un diagnostico facultativo
                    </Typography>
                </Grid>
            </Grid>
            
        </div>
    );
}


export default Information;