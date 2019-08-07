import React from 'react';

const Hikes = props => {
    return <div>
            <h1>Hikes</h1>
            <button onClick={() => props.history.push('/')}>Go Back</button>
        </div>
}

export default Hikes;