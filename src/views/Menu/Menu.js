import React  from 'react';
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
    Goals,
    Dashboard,
    Paraclinicos,
    Messages
} from './components';
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
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    
    const [state] = React.useState({
        goals: [],
        data: [],
        dataG: [],
        messages: [],
        progress: 0,
        p1 : [],
        p2 : [],
        p3 : [],
        p4 : [],
        p5 : [],
        p6 : [],
        c1 : [],
        c2 : [],
        c3 : [],
        c4 : [],
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
        getParas(localStorage.getItem('p_id'))
    }

    const getParas = (id) => {

        getParaclinico(id)
        .then(response => {
            return response.json();
        })  
        .then(json => {
            const p1 = []
            const p2 = []
            const p3 = []
            const p4 = []
            const p5 = []
            const p6 = []



            for(var x = 0; x < json.length; x++){
                var i = json[x]
                if(i.type === 'trigliceridos'){
                    p1.push(i)
                    localStorage.setItem("tri", i.value)
                    localStorage.setItem("tri_C", i.comment)
                }
                if(i.type === 'glicemia'){
                    p2.push(i)
                    localStorage.setItem("gli", i.value)
                    localStorage.setItem("gli_C", i.comment)
                }
                if(i.type === 'otro'){
                    p3.push(i)
                }
                if(i.type === 'hemoglobina_glicosilada'){
                    p4.push(i)
                    localStorage.setItem("hg", i.value)
                    localStorage.setItem("hg_C", i.comment)
                }
                if(i.type === 'colesterol_total'){
                    p5.push(i)
                    localStorage.setItem("clt", i.value)
                    localStorage.setItem("clt_C", i.comment)
                }
                if(i.type === 'Glucosa'){
                    p6.push(i)
                    localStorage.setItem("glu", i.value)
                }
                

                state.p1 = p1
                state.p2 = p2
                state.p3 = p3
                state.p4 = p4
                state.p5 = p5
                state.p6 = p6
                createData(p1, p2, p4, p5);
                createGlucoseChart(p6)
            }
        })
        .catch(error => {
            console.log(error.message);
        });
    }

    const createGlucoseChart = (p) =>{
        const label=[];
        const data=[];
        for(var x = 0; x < p.length; x++){
            var i = p[x]
            label.push(i.date)
            data.push(i.value)
        }
        const info = {
            labels: label,
            datasets:[
                {
                    label: 'Glucosa',
                    borderColor: palette.success.main,
                    data: data,
                    fill: false,
                } 
            ]
        }
        state.dataG = info;
    }

    const createData = (p1, p2, p3, p4) =>{
        const labels1=[];
        const labels2=[];
        const labels3=[];
        const labels4=[];
        const data1=[];
        const data2=[];
        const data3=[];
        const data4=[];
        
        for(var x = 0; x < p1.length; x++){
            var i = p1[x]
            labels1.push(i.date)
            data1.push(i.value)
        }
        for(var y = 0; y < p2.length; y++){
            var j = p2[y]
            labels2.push(j.date)
            data2.push(j.value)
        }
        for(var z = 0; z < p3.length; z++){
            var k = p3[z]
            labels3.push(k.date)
            data3.push(k.value)
        }
        for(var w = 0; w < p4.length; w++){
            var l = p4[w]
            labels4.push(l.date)
            data4.push(l.value)
        }

        const info = {
            labels: labels4,
            datasets:[
                {
                    label: 'Colesterol total',
                    borderColor: palette.valueH.main,
                    data: data4,
                    fill: false,
                }
            ]
        }
        state.c1 = info

        const infos = {
            labels: labels1,
            datasets:[
                {
                    label: 'Triglicéridos',
                    borderColor: palette.success.main,
                    data: data1,
                    fill: false,
                }
            ]
        }
        state.c3 = infos

        const inffo = {
            labels: labels3,
            datasets:[
                {
                    label: 'Hemoglobina Glicosilada',
                    borderColor: palette.error.main,
                    data: data3,
                    fill: false,
                }
            ]
        }
        state.c2 = inffo

        const iinfo = {
            labels: labels2,
            datasets:[
                {
                    label: 'Glicemia',
                    borderColor: palette.info.main,
                    data: data2,
                    fill: false,
                }
            ]
        }
        state.c4 = iinfo
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
                labels.push(i.date)
                data.push(i.value)
            }
            const info = {
                labels: labels,
                datasets:[
                    {
                        borderColor: palette.secondary.main,
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
        getParas(localStorage.getItem('p_id'))
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
                    <Tab label="Metas" {...a11yProps(1)} onClick={window.onload = handleSetGoal()} />
                    <Tab label="Graficos y avances" {...a11yProps(2)} onClick={window.onload = handleGraficos()} />
                    <Tab label="Paraclínicos" {...a11yProps(3)} onClick={window.onload = handleParaclinicos()}/>
                    <Tab label="DocBot" {...a11yProps(4)} onClick={window.onload = handleMessages()} />
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
                        dataG={state.dataG}
                    />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <Paraclinicos 
                        p1={state.p1}
                        p2={state.p2}
                        p3={state.p3}
                        p4={state.p4}
                        p5={state.p5}
                        p6={state.p6}
                        c1={state.c1}
                        c2={state.c2}
                        c3={state.c3}
                        c4={state.c4}
                    />
                </TabPanel> 
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <Messages messages={state.messages}/>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}


export default Menu;
