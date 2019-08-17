import React from 'react';
import { Form, Button, Label, Input } from 'semantic-ui-react';

const AuthForm = props => {
    // Here we have abstracted a login and signup form into 1 entity as a result we start a fetch based on previous props
    const handleSubmit = ev => {
        ev.preventDefault();
        props.startFetch(props.form)
        props.history.push('/')
    }

    // This function allows us to have capitalized submit(login/signup) buttons
    const capitalize = str => {
        let first = str.charAt(0).toUpperCase()
        return first + str.slice(1)
    }

    // Both of the following two functions will allow this form to be flexible depending on
    // whether a user selects login or signup. It will also allow the form to remain fully controlled
    const controlUsername = () => {
        if (props.signup) {
            return props.signup.username
        } else {
            return props.login.username
        }
    }

    const controlPassword = () => {
        if (props.signup) {
            return props.signup.password
        } else {
            return props.login.password
        }
    }

    return <Form className='standard-form' onSubmit={handleSubmit} name={props.form}>
        <Form.Field>
            <Label color='brown' as='a' icon='user' content='Username'/>
            <Input type='text' value={controlUsername()} onChange={props.handleOnChange} name='username' placeholder='Enter your username' autoComplete='username' required />
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a' icon='lock' content='Password'/>
            <Input type='password' value={controlPassword()} onChange={props.handleOnChange} name='password' autoComplete='current-password' required />
        </Form.Field>
        <Button icon='check' color='blue' type='submit' content={capitalize(props.form)} />
    </Form>

}

export default AuthForm;