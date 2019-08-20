import React from 'react';
import { Form, Grid, Button, Segment, Message } from 'semantic-ui-react';

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

    return <Grid columns={1}>
        <Grid.Column>
            <Form size='large' className='standard-form' onSubmit={handleSubmit} name={props.form}>
                <Message content={'Fill out the information below to ' + props.form} header={capitalize(props.form)} />
                <Segment stacked>
                    <Form.Field>
                        <Form.Input icon='user' iconPosition='left' type='text' value={controlUsername()} onChange={props.handleOnChange} name='username' placeholder='Enter your username' autoComplete='username' required />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input icon='lock' iconPosition='left' type='password' value={controlPassword()} onChange={props.handleOnChange} name='password' placeholder='Enter your password' autoComplete='current-password' required />
                    </Form.Field>
                <Button fluid icon='check' color='blue' type='submit' content={capitalize(props.form)} />
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
}

export default AuthForm;