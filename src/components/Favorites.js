import React from 'react';

const Favorites = props => {
    return <div>
            <h1>Favorites</h1>
            <button onClick={() => props.history.push('/')}>Go Back</button>
        </div>
}

export default Favorites;