import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { FormParaclinicos } from './components';



const Paraclinicos = props => {
    const { userid } = props;


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
                    <FormParaclinicos/>
                </Grid>
            </Grid>
        </div>
    );
}
Paraclinicos.propTypes = {
    userid: PropTypes.any.isRequired
  };

export default Paraclinicos;