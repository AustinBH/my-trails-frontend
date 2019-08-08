import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const Login = props => {

    const handleSubmit = ev => {
        ev.preventDefault();
        props.startFetch('login')
        props.history.push('/')
    }

    return <Form onSubmit={handleSubmit} name='login'>
        <Form.Field>
            <label>Username</label>
            <input type='text' value={props.login.username} onChange={props.handleOnChange} name='username' placeholder='Enter your username' autoComplete='username' required />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input type='password' value={props.login.password} onChange={props.handleOnChange} name='password' autoComplete='current-password' required />
        </Form.Field>
        <Button color='blue' type='submit' content='Login' />
    </Form>
    
}

export default Login;