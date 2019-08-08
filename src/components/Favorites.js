import React from 'react';
import { Button } from 'semantic-ui-react';

const Favorites = props => {

    return <div>
            <h1>Favorites</h1>
            <Button color='teal' icon='backward' onClick={() => props.history.push('/')} content='Go Back' />
        </div>
}

export default Favorites;