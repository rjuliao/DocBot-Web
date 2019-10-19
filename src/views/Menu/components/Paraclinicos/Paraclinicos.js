import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { FormParaclinicos, Hemoglobina, Trigliceridos, Glicemia, Colesterol } from './components';



const Paraclinicos = props => {
    const { user } = props;


    return(
        <div>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                >
                    <FormParaclinicos user={user}/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Hemoglobina/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Trigliceridos/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Glicemia/>
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Colesterol/>
                </Grid>
            </Grid>
        </div>
    );
}
Paraclinicos.propTypes = {
    user: PropTypes.isRequired
};

export default Paraclinicos;