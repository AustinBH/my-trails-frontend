import React from 'react'
import { Button, Form, Label, Icon, Image, Dropdown } from 'semantic-ui-react';

const options = [
    { key: 10, text: 'Ten', value: 10 },
    { key: 20, text: 'Twenty', value: 20 },
    { key: 30, text: 'Thirty', value: 30 },
    { key: 40, text: 'Fourty', value: 40 },
    { key: 50, text: 'Fifty', value: 50 },
]

const EditForm = props => {
    return <Form className='standard-form' onSubmit={props.handleOnSubmit} name='login'>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='user' />
                Username
            </Label>
            <Form.Input type='text' value={props.user.username} onChange={props.handleOnChange} name='username' autoComplete='username' placeholder='Enter a new username'/>
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='image outline' />
                Avatar
            </Label>
        </Form.Field>
        <Form.Group>
                {props.avatars && props.avatars.length > 0 && props.avatars.map(avatar => {
                    return <Form.Field key={avatar.id}>
                        <Image src={avatar.img_url} avatar />
                        <Form.Radio
                            name='avatar'
                            label={avatar.name}
                            value={avatar.id}
                            checked={props.user.avatar === avatar.id}
                            onChange={props.handleOnChange}
                        />
                    </Form.Field>
                })}
        </Form.Group>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='lock' />
                Old Password
            </Label>
            <Form.Input type='password' value={props.user.password} onChange={props.handleOnChange} name='password' autoComplete='current-password' placeholder='Enter your current password' required />
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='lock' />
                New Password
            </Label>
            <Form.Input type='password' value={props.user.newPassword} onChange={props.handleOnChange} name='newPassword' autoComplete='current-password' placeholder='Enter a new password' />
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='truck' />
                Distance in miles
            </Label>
            <Dropdown value={props.user.distance} onChange={props.handleOnChange} options={options} name='distance' placeholder='Select a range' selection />
        </Form.Field>
        <Form.Field>
            <Label color='brown' as='a'>
                <Icon name='map pin' />
                Results
            </Label>
            <Dropdown value={props.user.results} onChange={props.handleOnChange} options={options} name='results' placeholder='Select the number of trails' selection />
        </Form.Field>
        <Button color='blue' type='submit' content='Edit' />
    </Form>
}

export default EditForm;