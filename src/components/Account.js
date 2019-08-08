import React from 'react';
import { Button } from 'semantic-ui-react';

const Account = props => {
    return <div>
            <h1>Account</h1>
            <Button icon='backward' onClick={() => props.history.push('/')} content='Go Back' />
        </div>
}

export default Account;