import React from 'react';

const SearchResults = props => {
    return (
        props.trails.map(trail => {
            return <li key={trail.id}>
                {trail.name}
            </li>
        })
    )
}

export default SearchResults