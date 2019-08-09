import React from 'react';
import { Button } from 'semantic-ui-react';
import UserTrailInfo from './UserTrailInfo';


const Hikes = props => {
    return <>
        <h1>Your Completed Hikes</h1>
        <UserTrailInfo hikes='completed'/>
        <Button color='teal' icon='backward' onClick={() => props.history.push('/')} content='Go Back' />
    </>
}

export default Hikes;