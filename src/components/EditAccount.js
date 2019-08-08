import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Form, Placeholder } from 'semantic-ui-react';
import { fetchEdit } from '../actions/userActions';

class EditAccount extends Component {
    constructor(props){
        super(props)
            this.state = {
                username: props.user.username || '',
                password: '',
                newPassword: '',
                isLoading: true
            }
    }

    componentDidMount() {
        this.setState({username: this.props.user.username, isLoading: false})
    }

    handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    handleSubmit = ev => {
        ev.preventDefault()
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
                <Form onSubmit={this.handleSubmit} name='login'>
                    <Form.Field>
                        <label>Username</label>
                        <input type='text' value={this.state.username} onChange={this.handleChange} name='username' autoComplete='username' required />
                    </Form.Field>
                    <Form.Field>
                        <label>Old Password</label>
                        <input type='password' value={this.state.password} onChange={this.handleChange} name='password' autoComplete='current-password' required />
                    </Form.Field>
                    <Form.Field>
                        <label>New Password</label>
                        <input type='password' value={this.state.newPassword} onChange={this.handleChange} name='newPassword' autoComplete='current-password' />
                    </Form.Field>
                    <Button type='submit' content='Edit' />
                </Form>
            }
            
        </>
    }
}

const mapDispatchToProps = dispatch => ({
    fetchEdit: (data) => dispatch(fetchEdit(data))
})

export default connect(null, mapDispatchToProps)(EditAccount);