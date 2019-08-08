import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const Signup = props => {

    const handleSubmit = ev => {
        ev.preventDefault();
        props.startFetch('signup')
        props.history.push('/')
    }

    return <Form onSubmit={handleSubmit} name='signup'>
        <Form.Field>
            <label>Username</label>
            <input type='text' value={props.signup.username} onChange={props.handleOnChange} name='username' placeholder='Enter your username' autoComplete='username' required />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input type='password' value={props.signup.password} onChange={props.handleOnChange} name='password' autoComplete='current-password' required />
        </Form.Field>
        <Button color='blue' type='submit' content='signup' />
    </Form>

}

export default Signup;