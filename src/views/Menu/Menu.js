import React, { useState, Component } from 'react';
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
    Paraclinicos,
    Messages
} from './components';
import InfoIcon from '@material-ui/icons/Info';
import { createStore } from 'redux';
import { withStyles } from '@material-ui/styles';
import { getGoals, getParaclinico, getWeight, getMessages } from '../../services/api';
import palette from '../../theme/palette';
import moment from 'moment';

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
    
  const [state, setState] = React.useState({
    goals: [],
    data: [],
    messages: [],
    progress: 0,
  });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    /**********************************************METAS*******************************************************/
    const handleSetGoal= ()=>{
        
       getAllGoalsInfo(localStorage.getItem('p_id'))
    }

    const getAllGoalsInfo =(id)=>{

        getGoals(id)
        .then(response => {
            return response.json();
        })  
        .then(json => {

            state.goals = json;
            var l = json.length
            var s = 0;
            json.map(goal => {
                s += goal.progress/goal.quantity
            })
            var p = s/l
            state.progress = (p*100).toFixed(0)
        })
        .catch(error => {
            console.log(error.message);
        });
    }
    /*******************************************PARACLÍNICOS****************************************************/
    const handleParaclinicos =()=>{
        getParaclinico(localStorage.getItem('p_id'))
        .then(response => {
            return response.json();
        })  
        .then(json => {
        })
        .catch(error => {
            console.log(error.message);
        });
    }


    /*******************************************GRÁFICOS******************************************************/
    const handleGraficos = ()=>{

        getWeight(localStorage.getItem('p_id'))
        .then(response => {
            return response.json();
        })  
        .then(json => { 
            const labels=[];
            const data=[];

            //var l = json.weight.length >=10 ? 10: json.weight.length;
            
            for(var x = 0; x < json.weight.length; x++){
                var i = json.weight[x]
                labels.push(moment(i.date).format('DD/MM'))
                data.push(i.value)
            }
            const info = {
                labels: labels,
                datasets:[
                    {
                        borderColor: palette.warning.main,
                        data: data,
                        fill: false,
                    }   
                ]
            }
            state.data = info
        })
        .catch(error => {
            console.log(error.message);
        });
        getAllGoalsInfo(localStorage.getItem('p_id'))
    }

    const handleMessages = ()=>{

        getMessages(localStorage.getItem('id'),localStorage.getItem('p_id'))
        .then(response => {
            return response.json();
        })  
        .then(json => {
            console.log(json);
            state.messages = json
        })
        .catch(error => {
            console.log(error.message);
        });
    }

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
                    <Tab label="Metas" {...a11yProps(1)} onClick={()=>handleSetGoal()} />
                    <Tab label="Graficos y avances" {...a11yProps(2)} onClick={()=>handleGraficos()} />
                    <Tab label="Paraclínicos" {...a11yProps(3)} onClick={()=>handleParaclinicos()}/>
                    <Tab label="DocBot" {...a11yProps(4)} onClick={()=>handleMessages()} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                
                <TabPanel value={value}  index={0} dir={theme.direction}>
                    <InformationCard />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Goals goals={state.goals}/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Dashboard 
                        data={state.data} 
                        goalP={state.progress} 
                        goals={state.goals}
                    />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <Paraclinicos />
                </TabPanel> 
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <Messages messages={state.messages}/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}


export default Menu;
