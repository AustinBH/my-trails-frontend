import React, { Component } from 'react';
import { Form, Button, Label, Input, Icon } from 'semantic-ui-react';

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
        return <>
            <h1>Search by Coordinates</h1>
            <Form className='standard-form' onSubmit={this.handleSubmit}>
                <Form.Field>
                    <Label color='brown' as='a'>
                        <Icon name='map marker' />
                        Latitude
                </Label>
                    <Input type='number' value={this.state.latitude} onChange={this.handleChange} name='latitude' placeholder='Enter a latitude' required />
                </Form.Field>
                <Form.Field>
                    <Label color='brown' as='a'>
                        <Icon name='map marker alternate' />
                        Longitude
                </Label>
                    <Input type='number' value={this.state.longitude} onChange={this.handleChange} name='longitude' placeholder='Enter a longitude' required />
                </Form.Field>
                <Button color='blue' type='submit' content='Search' />
            </Form>
        </>
    }
}

export default TrailSearchForm;