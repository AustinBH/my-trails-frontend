import React from 'react';
import { Form, Button, Label, Input, Icon } from 'semantic-ui-react';

const AuthForm = props => {

    const handleSubmit = ev => {
        ev.preventDefault();
        props.startFetch(props.form)
        props.history.push('/')
    }

    const capitalize = str => {
        let first = str.charAt(0).toUpperCase()
        return first + str.slice(1)
    }

    return <Form className='standard-form' onSubmit={handleSubmit} name={props.form}>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='user' />
                Username
            </Label>
            <Input type='text' value={(props.signup && props.signup.username) || (props.login && props.login.username)} onChange={props.handleOnChange} name='username' placeholder='Enter your username' autoComplete='username' required />
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='lock' />
                Password
            </Label>
            <Input type='password' value={(props.signup && props.signup.password) || (props.login && props.login.password)} onChange={props.handleOnChange} name='password' autoComplete='current-password' required />
        </Form.Field>
        <Button color='blue' type='submit' content={capitalize(props.form)} />
    </Form>

}

export default AuthForm;