import React from 'react';
import { Form, Button, Input, Label, Icon } from 'semantic-ui-react';

const Login = props => {

    const handleSubmit = ev => {
        ev.preventDefault();
        props.startFetch('login')
        props.history.push('/')
    }

    return <Form className='standard-form' onSubmit={handleSubmit} name='login'>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='user' />
                Username
            </Label>
            <Input type='text' value={props.login.username} onChange={props.handleOnChange} name='username' placeholder='Enter your username' autoComplete='username' required />
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='lock' />
                Password
            </Label>
            <Input type='password' value={props.login.password} onChange={props.handleOnChange} name='password' autoComplete='current-password' required />
        </Form.Field>
        <Button color='blue' type='submit' content='Login' />
    </Form>
    
}

export default Login;