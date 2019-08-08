import React from 'react';
import { Grid } from 'semantic-ui-react';

const InfoHolder = props => {
    return (
        <Grid columns={3} divided>
            <Grid.Row>
                <Grid.Column>
                    <label><strong>Name: </strong></label>
                    <p>{props.trail.name}</p>
                </Grid.Column>
                <Grid.Column>
                    <label><strong>Summary: </strong></label>
                    <p>{props.trail.summary}</p>
                </Grid.Column>
                <Grid.Column>
                    <label><strong>Location: </strong></label>
                    <p>{props.trail.location}</p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <label><strong>Length: </strong></label>
                    <p>{props.trail.length} miles</p>
                </Grid.Column>
                <Grid.Column>
                    <label><strong>Ascent: </strong></label>
                    <p>{props.trail.ascent} ft</p>
                </Grid.Column>
                <Grid.Column>
                    <label><strong>Condition: </strong></label>
                    <p>{props.trail.conditionStatus}</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default InfoHolder;