import React from 'react'
import { Button, Form, Label, Image, Dropdown, Segment, Grid } from 'semantic-ui-react';

const options = [
    { key: 10, text: 'Ten', value: 10 },
    { key: 20, text: 'Twenty', value: 20 },
    { key: 30, text: 'Thirty', value: 30 },
    { key: 40, text: 'Fourty', value: 40 },
    { key: 50, text: 'Fifty', value: 50 },
]

const EditForm = props => {
    return <Grid columns={1}>
        <Grid.Column>
            <Form className='standard-form' onSubmit={props.handleOnSubmit}>
                <Segment raised>
                    <Form.Field>
                        <Label color='brown' as='a' icon='user' content='Username' />
                        <Form.Input type='text' value={props.user.username} onChange={props.handleOnChange} name='username' autoComplete='username' placeholder='Enter a new username' />
                    </Form.Field>
                    <Form.Field>
                        <Label color='brown' as='a' icon='lock' content='Current Password' />
                        <Form.Input type='password' value={props.user.password} onChange={props.handleOnChange} name='password' autoComplete='current-password' placeholder='Enter your current password' required />
                    </Form.Field>
                    <Form.Field>
                        <Label color='brown' as='a' icon='lock' content='New Password' />
                        <Form.Input type='password' value={props.user.newPassword} onChange={props.handleOnChange} name='newPassword' autoComplete='current-password' placeholder='Enter a new password' />
                    </Form.Field>
                    <Form.Field>
                        <Label color='brown' as='a' icon='truck' content='Distance (miles)' />
                        <Dropdown value={props.user.distance} onChange={props.handleOnChange} options={options} name='distance' placeholder='Select a range' selection />
                    </Form.Field>
                    <Form.Field>
                        <Label color='brown' as='a' icon='map pin' content='Results' />
                        <Dropdown value={props.user.results} onChange={props.handleOnChange} options={options} name='results' placeholder='Select the trails to be returned' selection />
                    </Form.Field>
                </Segment>
                <Segment raised>
                    <Label color='brown' as='a' icon='image outline' content='Avatar' />
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
                    <Button fluid color='blue' type='submit' content='Edit' />
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
}

export default EditForm;