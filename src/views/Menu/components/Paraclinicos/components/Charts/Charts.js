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
    const { user, p1, p2,  p4, p5, data } = props;


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
                    <ClsChart data={data}/>
                </Grid>
                <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                >
                    <TrgChart data={data}/>
                </Grid>
                <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                >
                    <HGChart data={data}/>
                </Grid>
                <Grid
                    item
                    lg={12}
                    sm={12}
                    xl={12}
                    xs={12}
                >
                    <GlcChart data={data}/>
                </Grid>

            </Grid>
        </div>
    );
}
Charts.propTypes = {
    user: PropTypes.isRequired
    
};

export default Charts;