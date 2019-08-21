import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const FavButton = props => {
    let button = <Button animated='fade' name='fav' onClick={(event) => props.handleOnClick(event, props.trail)} >
        <Button.Content hidden>Fav</Button.Content>
        <Button.Content visible>
            <Icon name='star outline' />
        </Button.Content>
    </Button>
    // Here we are checking to see if the user has liked a trail before so that we can color in the button
    for (let like of props.user.likes) {
        if (like.trail_id === props.trail.id)
            button = <Button animated='fade' color='orange' name='fav' onClick={(event) => props.handleOnClick(event, props.trail)} >
                <Button.Content hidden>Fav</Button.Content>
                <Button.Content visible>
                    <Icon name='star' />
                </Button.Content>
            </Button>
    }
    return button
}

export default FavButton;