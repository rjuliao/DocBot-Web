import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import {  
    ClsChart, 
    TrgChart, 
    HGChart,
    GlcChart
} from './components';



const Charts = props => {
    const { dataC, dataT, dataG, dataHG } = props;


    return(
        <div>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                >
                    <HGChart data={dataHG}/>
                </Grid>
                <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                >
                    <TrgChart data={dataT}/>
                </Grid>
                <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                >
                    <GlcChart data={dataG}/>
                </Grid>
                <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                >
                    <ClsChart data={dataC}/>
                </Grid>

            </Grid>
        </div>
    );
}
Charts.propTypes = {
    user: PropTypes.isRequired
    
};

export default Charts;