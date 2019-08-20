import React from 'react';
import { Button } from 'semantic-ui-react';

const FavButton = props => {
    let button = <Button name='fav' icon='star outline' content='Fav' onClick={(event) => props.handleOnClick(event, props.trail)} />
    // Here we are checking to see if the user has liked a trail before so that we can color in the button
    for (let like of props.user.likes) {
        if (like.trail_id === props.trail.id)
            button = <Button color='orange' name='fav' icon='star' content='Fav' onClick={(event) => props.handleOnClick(event, props.trail)} />
    }
    return button
}

export default FavButton;