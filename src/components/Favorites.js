import React from 'react';
import { Button } from 'semantic-ui-react';
import UserTrailInfo from './UserTrailInfo';

const Favorites = props => {
    return <>
        <h1>Your Favorite Trails</h1>
        <UserTrailInfo hikes='liked'/>
        <Button color='brown' icon='backward' onClick={() => props.history.push('/')} content='Go Back' />
    </>
}

export default Favorites;