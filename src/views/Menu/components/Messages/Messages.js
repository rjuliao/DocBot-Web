import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { InfoMessage, MessageCard } from './components';



const Messages = props => {
    const { messages } = props;


    return(
        <div>
            <div>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <InfoMessage/>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid
                    container
                    spacing={3}
                >
                    {messages.map(message => (
                    <Grid
                    item
                    key={message.id}
                    lg={4}
                    md={6}
                    xs={12}
                    > 
                    <MessageCard message={message} />
                    </Grid>))}
                </Grid>
            </div>
        </div>
    );
}
Messages.propTypes = {
    messages: PropTypes.array.isRequired
};

export default Messages;