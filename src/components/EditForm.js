import React from 'react'
import { Button, Form, Input, Label, Icon } from 'semantic-ui-react';

const EditForm = props => {
    return <Form className='standard-form' onSubmit={props.handleOnSubmit} name='login'>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='user' />
                Username
                        </Label>
            <Input type='text' value={props.user.username} onChange={props.handleOnChange} name='username' autoComplete='username' placeholder='Enter a new username'/>
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='lock' />
                Old Password
                        </Label>
            <Input type='password' value={props.user.password} onChange={props.handleOnChange} name='password' autoComplete='current-password' placeholder='Enter your current password' required />
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='lock' />
                New Password
                        </Label>
            <Input type='password' value={props.user.newPassword} onChange={props.handleOnChange} name='newPassword' autoComplete='current-password' placeholder='Enter a new password' />
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='truck' />
                Distance in miles
                        </Label>
            <select value={props.user.distance} onChange={props.handleOnChange} name='distance' placeholder='Select your search distance' required >
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
                <option value='40'>40</option>
                <option value='50'>50</option>
            </select>
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='map pin' />
                Results
                        </Label>
            <select value={props.user.results} onChange={props.handleOnChange} name='results' placeholder='Select the number of trails' required >
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
                <option value='40'>40</option>
                <option value='50'>50</option>
            </select>
        </Form.Field>
        <Button color='blue' type='submit' content='Edit' />
    </Form>
}

export default EditForm;