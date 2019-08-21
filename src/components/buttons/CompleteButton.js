import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const CompleteButton = props => {
    let button = <Button animated='fade' name='complete' onClick={(event) => props.handleOnClick(event, props.trail)} >
        <Button.Content hidden>Complete</Button.Content>
        <Button.Content visible>
            <Icon name='check circle outline' />
        </Button.Content>
    </Button>
    // This for of statement is used to change the button's appearance based on whether they completed the trail or not
    for (let completed of props.user.completed_hikes) {
        if (completed.trail_id === props.trail.id)
            button = <Button animated='fade' color='green' name='complete' onClick={(event) => props.handleOnClick(event, props.trail)} >
                <Button.Content hidden>Complete</Button.Content>
                <Button.Content visible>
                    <Icon name='check circle outline' />
                </Button.Content>
            </Button>
    }
    return button
}

export default CompleteButton;