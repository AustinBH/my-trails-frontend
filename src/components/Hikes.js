import React from 'react';
import { Button } from 'semantic-ui-react';

const Hikes = props => {
    return <div>
            <h1>Hikes</h1>
            <Button icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </div>
}

export default Hikes;