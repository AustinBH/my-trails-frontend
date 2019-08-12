import React from 'react';
import { Grid } from 'semantic-ui-react';

const InfoHolder = props => {

    // Adding some placeholder images for when there is no image for the trail
    const placeholders = [
        <img className='info-image' src='https://placekitten.com/640/360' alt='trail placeholder' />,
        <img className='info-image' src='https://placekitten.com/580/360' alt='trail placeholder' />,
        <img className='info-image' src='https://placekitten.com/520/360' alt='trail placeholder' />,
        <img className='info-image' src='https://placekitten.com/460/360' alt='trail placeholder' />,
        <img className='info-image' src='https://placekitten.com/360/360' alt='trail placeholder' />
    ]

    return (
        <Grid columns={3} celled>
            <Grid.Row>
                {/* Adding a ternary to either display the trail image or one of the placeholders at random */}
                {props.trail.imgMedium ?
                    <img className='info-image' src={props.trail.imgMedium} alt={props.trail.name}/>
                :
                    placeholders[Math.floor(Math.random() * Math.floor(placeholders.length))]
                }
            </Grid.Row>
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