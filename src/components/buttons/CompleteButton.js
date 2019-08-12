import React from 'react';
import { Button } from 'semantic-ui-react';

const CompleteButton = props => {
    let button = <Button name='complete' icon='check circle outline' content='Complete' onClick={(event) => props.handleOnClick(event, props.trail)} />
    for (let completed of props.user.completed_hikes) {
        if (completed.trail_id === props.trail.id)
            button = <Button color='green' name='complete' icon='check circle' content='Complete' onClick={(event) => props.handleOnClick(event, props.trail)} />
    }
    return button
}

export default CompleteButton;