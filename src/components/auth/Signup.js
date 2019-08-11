import React from 'react';
import { Form, Button, Label, Input, Icon } from 'semantic-ui-react';

const Signup = props => {

    const handleSubmit = ev => {
        ev.preventDefault();
        props.startFetch('signup')
        props.history.push('/')
    }

    return <Form className='standard-form' onSubmit={handleSubmit} name='signup'>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='user' />
                Username
            </Label>
            <Input type='text' value={props.signup.username} onChange={props.handleOnChange} name='username' placeholder='Enter your username' autoComplete='username' required />
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='lock' />
                Password
            </Label>
            <Input type='password' value={props.signup.password} onChange={props.handleOnChange} name='password' autoComplete='current-password' required />
        </Form.Field>
        <Button color='blue' type='submit' content='signup' />
    </Form>

}

export default Signup;