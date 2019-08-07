import React from 'react';

const Account = props => {
    return <div>
            <h1>Account</h1>
            <button onClick={() => props.history.push('/')}>Go Back</button>
        </div>
}

export default Account;