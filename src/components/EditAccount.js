import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, Placeholder, Input, Label, Icon } from 'semantic-ui-react';
import { fetchEdit } from '../actions/userActions';

class EditAccount extends Component {
    state = {
        username: '',
        password: '',
        newPassword: '',
        distance: 0,
        results: 0
    }

    handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        let user = {}
        if (!this.state.newPassword) {
            user = { username: this.state.username, password: this.state.password, distance: this.state.distance, results: this.state.results}
            this.props.fetchEdit({...user})
        } else {
            user = { username: this.state.username, password: this.state.password, new_password: this.state.newPassword, distance: this.state.distance, results: this.state.results}
            this.props.fetchEdit({...user})
        }
        this.props.history.push('/')
    }

    render() {
        return <>
            <h1>Edit My Account Info</h1>
            {this.state.isLoading ?
                <Placeholder>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder>
            :
                <Form className='standard-form' onSubmit={this.handleSubmit} name='login'>
                    <Form.Field>
                        <Label color='brown' as='a'>
                            <Icon name='user'/>
                            Username
                        </Label>
                        <Input type='text' value={this.state.username} onChange={this.handleChange} name='username' autoComplete='username' placeholder='Enter a new username' />
                    </Form.Field>
                    <Form.Field>
                        <Label color='brown' as='a'>
                            <Icon name='lock'/>
                            Old Password
                        </Label>
                        <Input type='password' value={this.state.password} onChange={this.handleChange} name='password' autoComplete='current-password' placeholder='Enter your current password' required />
                    </Form.Field>
                    <Form.Field>
                        <Label color='brown' as='a'>
                            <Icon name='lock' />
                            New Password
                        </Label>
                        <Input type='password' value={this.state.newPassword} onChange={this.handleChange} name='newPassword' autoComplete='current-password' placeholder='Enter a new password' />
                    </Form.Field>
                    <Form.Field>
                        <Label color='brown' as='a'>
                            <Icon name='truck' />
                            Distance in miles
                        </Label>
                        <Input list='distances' placeholder='Choose your search range...' />
                        <datalist id='distances'>
                            <option value='10' />
                            <option value='20' />
                            <option value='30' />
                            <option value='40' />
                            <option value='50' />
                        </datalist>
                    </Form.Field>
                    <Form.Field>
                        <Label color='brown' as='a'>
                            <Icon name='map pin' />
                            Results
                        </Label>
                        <Input list='results' placeholder='Choose the number of trails you see...' />
                        <datalist id='results'>
                            <option value='10' />
                            <option value='20' />
                            <option value='30' />
                            <option value='40' />
                            <option value='50' />
                        </datalist>
                    </Form.Field>
                    <Button color='blue' type='submit' content='Edit' />
                </Form>
            }
            
        </>
    }
}

const mapDispatchToProps = dispatch => ({
    fetchEdit: (data) => dispatch(fetchEdit(data))
})

export default connect(null, mapDispatchToProps)(EditAccount);