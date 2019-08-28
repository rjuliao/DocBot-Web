import React, {Component} from 'react';
import Appbar from '@material-ui/core/AppBar';
import {makeStyles} from '@material-ui/core/styles'

import logo from "./images/logo-3.png";
import { Typography, Toolbar } from '@material-ui/core';
import { NONAME } from 'dns';


const useStyles = makeStyles(theme =>({
    root: {
        flexGrow: 1,
        boxShadow: 'none',
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Roboto, sans-serif',
    },
    imgs: {
        width: 88,
    },
}));


export default function Header() {
    const classes = useStyles();


    return(
       <div className={classes.root}>
           <Appbar position="static">
               <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Bienvenido a Botic
                    </Typography>
                    <div>
                        <img src={logo} className={classes.imgs}/>
                    </div>
                </Toolbar> 
           </Appbar>
       </div>
    );
}
