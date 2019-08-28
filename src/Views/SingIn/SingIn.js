import React from 'react';
import { makeStyles, Grid, Card, CardContent, Typography, Input, InputBase, Button, CardActions } from '@material-ui/core';
import Header from '../../Component/Header';
import logo from '../../Component/images/logo.png'

const useStyles = makeStyles(theme =>({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
    },
    content: {
        padding: '40px 20px 25px 40px',
        alignItems: 'center',
        display: 'flex'
    },
    imgLogo: {
        padding: '40px 20px 25px 40px',
        width: 430
    },
    fonts: {
        fontFamily: 'Roboto, sans-serif',
        color:  '#D92588',
        fontSize: 40,
    },
    button: {
        backgroundColor: '#5D29A6',
        color: '#F2F2F2',
    }
}));

export default function SingIn(){
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Header/>
            <div>
                <Grid container spacing={5}>
                    <Grid item >
                            <img src={logo} className={classes.imgLogo}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" className={classes.fonts}>
                                    E-mail
                                </Typography>
                                <InputBase placeholder="Email"/>
                                <Typography variant="h6" className={classes.fonts}>
                                    Contraseña
                                </Typography>
                                <InputBase placeholder="Password" type="password"/>
                                <CardActions>
                                    <Button className={classes.button}>Iniciar Sesión</Button>
                                    <Button className={classes.button}>Registrarse</Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}