import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, 
    Divider, 
    Typography, 
    Grid, 
    Button, 
    Fab } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import TestIcon from '@material-ui/icons/FormatListBulleted'
import Popup from './Popup/Popup';

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

const InformationCard = props => {
    const { user } = props
    const classes = useStyles(); 
    const [state, setState] = React.useState({
        showPopup: false,
    });
    
    const handlePopup = name => event => {
        setState({ ...state, [name]: !state.showPopup});
    };
    

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
                <Grid
                    item
                    xs={4}
                >
                    <Fab variant="extended"  color="primary" aria-label="add" className={classes.margin}>
                        <DeleteIcon className={classes.icons} />
                         Eliminar Paciente
                    </Fab>
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <Fab variant="extended" onClick={handlePopup('showPopup')} color="primary" aria-label="add" className={classes.margin}>
                        <CreateIcon className={classes.icons}/>
                        Editar Información
                    </Fab>
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
                        <TestIcon className={classes.icons}/>
                        Aplicar FindRisk
                    </Fab>
                </Grid>
                {state.showPopup?
                <Popup user={user} closePopup={handlePopup('showPopup')}/>: null }  
            </Grid>
        </div>
    );
}

InformationCard.propTypes = {
    user: PropTypes.any.isRequired,
};


export default InformationCard;