import React, { Component } from 'react';

class UserInput extends Component {
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
        console.log(ev.target.parentNode.name)
        this.setState({
            [ev.target.parentNode.name]: {
                ...this.state[ev.target.parentNode.name], [ev.target.name]: ev.target.value
            }
        })
    }

    handleSubmit = ev => {
        ev.preventDefault();
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} name='login'>
                    <input type='text' value={this.state.login.username} onChange={this.handleChange} name='username' placeholder='Enter your username' />
                    <input type='password' value={this.state.login.password} onChange={this.handleChange} name='password'/>
                    <input type='submit' value='Login' />
                </form>
                <form onSubmit={this.handleSubmit} name='signup'>
                    <input type='text' value={this.state.signup.username} onChange={this.handleChange} name='username' placeholder='Enter a new username' />
                    <input type='password' value={this.state.signup.password} onChange={this.handleChange} name='password' />
                    <input type='submit' value='Signup' />
                </form>
            </div>
        )
    }

}

export default UserInput