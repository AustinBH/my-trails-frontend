import React from 'react';

const Search = props => {
    return <div>
            <h1>Search</h1>
            <button onClick={() => props.history.push('/')}>Go Back</button>
        </div>
}

export default Search;