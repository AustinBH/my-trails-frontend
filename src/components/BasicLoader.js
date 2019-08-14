import React from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const BasicLoader = props => {
    return <div className='info-holder'>
        <Segment className='info-loader'>
            <Dimmer active>
                <Loader>Getting {props.info}...</Loader>
            </Dimmer>
        </Segment>
    </div> 

}

export default BasicLoader;