import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { fetchSignup } from '../actions/userActions';
import { fetchLogin } from '../actions/userActions';

class UserContainer extends Component {
    state = {
        login: {
            username: '',
            password: ''
        },
        signup: {
            username: '',
            password: ''
        }
        
    }

    handleChange = ev => {
        this.setState({
            [ev.target.parentNode.parentNode.name]: {
                ...this.state[ev.target.parentNode.parentNode.name], [ev.target.name]: ev.target.value
            }
        })
    }

    handleSubmit = ev => {
        ev.preventDefault();
        ev.target.name !== 'login' ? this.props.fetchSignup(this.state.signup) : this.props.fetchLogin(this.state.login)
    }

    render() {
        return (
            <div>
                <h1>Hike Amie</h1>
                <Form onSubmit={this.handleSubmit} name='login'>
                    <Form.Field>
                        <label>Username</label>
                        <input type='text' value={this.state.login.username} onChange={this.handleChange} name='username' placeholder='Enter your username' autoComplete='username' required />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type='password' value={this.state.login.password} onChange={this.handleChange} name='password' autoComplete='current-password' required />
                    </Form.Field>
                    <Button color='blue' type='submit' content='Login' />
                </Form>
                <Form onSubmit={this.handleSubmit} name='signup'>
                    <Form.Field>
                        <label>Username</label>
                        <input type='text' value={this.state.signup.username} onChange={this.handleChange} name='username' placeholder='Enter a new username' autoComplete='username' required />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type='password' value={this.state.signup.password} onChange={this.handleChange} name='password' autoComplete='current-password' required />
                    </Form.Field>
                    <Button color='blue' type='submit' content='Signup' />
                </Form>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    fetchLogin: (data) => dispatch(fetchLogin(data)),
    fetchSignup: (data) => dispatch(fetchSignup(data))
})

export default connect(null, mapDispatchToProps)(UserContainer);