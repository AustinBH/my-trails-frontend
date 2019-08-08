import React from 'react';
import { Button } from 'semantic-ui-react';

const FavButton = props => {
    let button = <Button name='fav' icon='star outline' content='Fav' onClick={(event) => props.handleOnClick(event, props.trail)} />
    for (let like of props.user.likes) {
        if (like.trail_id === props.trail.id)
            button = <Button color='orange' name='fav' icon='star' content='Fav' onClick={(event) => props.handleOnClick(event, props.trail)} />
    }
    return button
}

export default FavButton;