import React, { Component } from 'react';
import { Form, Button, Label, Input, Segment, Grid } from 'semantic-ui-react';

class TrailSearchForm extends Component {

    state = {
        latitude: '',
        longitude: ''
    }

    // We need to keep track of what lat/long the user is entering but want the form to be controlled
    handleChange = ev => {
        this.setState({ 
            [ev.target.name]: ev.target.value
        })
    }

    /*  Here we prevent default to prevent a page refresh,
        submit to our parent component the selected location,
        and then update our state to be cleared */
    handleSubmit = ev => {
        ev.preventDefault()
        this.props.handleOnSubmit(ev, {...this.state})
        this.setState({latitude: '', longitude: ''})
    }

    render() {
        return <Grid columns={1}>
            <Grid.Column>
                <h1>Search by Coordinates</h1>
                    <Form className='standard-form' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <Label color='brown' as='a' icon='map marker' content='Latitude' />
                                    <Input type='number' value={this.state.latitude} onChange={this.handleChange} name='latitude' placeholder='Enter a latitude' required />
                                </Form.Field>
                                <Form.Field>
                                    <Label color='brown' as='a' icon='map marker alternate' content='Longitude' />
                                    <Input type='number' value={this.state.longitude} onChange={this.handleChange} name='longitude' placeholder='Enter a longitude' required />
                                </Form.Field>
                            </Form.Group>
                            <Button fluid color='blue' type='submit' content='Search' />
                        </Segment>
                    </Form>
            </Grid.Column>
        </Grid>
    }
}

export default TrailSearchForm;