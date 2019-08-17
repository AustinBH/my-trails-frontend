import React from 'react';
import { Button } from 'semantic-ui-react';
import UserTrailInfo from './UserTrailInfo';

const Trails = props => {
    return <>
        <h1>Your Completed Trails</h1>
        <UserTrailInfo hikes='completed'/>
        <Button color='brown' icon='backward' onClick={() => props.history.push('/')} content='Go Back' />
    </>
}

export default Trails;