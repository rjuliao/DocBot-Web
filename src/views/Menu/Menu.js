import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
    InformationCard,
    MenuButtons,
    Goals,
    Dashboard,
    Paraclinicos
} from './components';
import { createStore } from 'redux';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
    },
    buttonbase: {
        width: 200,
        height: 50,
        color: '#3F51B5'

    }
}));





const Menu = props => {
    const { location, savePatient } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                    <Tab label="Información" {...a11yProps(0)} />
                    <Tab label="Metas" {...a11yProps(1)} />
                    <Tab label="Graficos y avances" {...a11yProps(2)} />
                    <Tab label="Paraclínicos" {...a11yProps(3)} />
                    <Tab label="DocBot" {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <InformationCard user={location.info.nombre}/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Goals/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Dashboard/>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <Paraclinicos/>
                </TabPanel> 
                <TabPanel value={value} index={4} dir={theme.direction}>
                    jajajaj
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}


export default Menu;
