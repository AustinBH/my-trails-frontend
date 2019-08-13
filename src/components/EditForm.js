import React from 'react'
import { Button, Form, Input, Label, Icon, Image } from 'semantic-ui-react';

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
                <Icon name='image outline' />
                Avatar
            </Label>
            <Form.Group inline name='avatar'>
                <Form.Radio
                    label='hiker'
                    value='1'
                    checked={props.user.avatar === '1'}
                    onChange={props.handleOnChange}
                />
                <Image src={props.avatars[0].img_url} avatar />
                <Form.Radio
                    label='female 1'
                    value='2'
                    checked={props.user.avatar === '2'}
                    onChange={props.handleOnChange}
                />
                <Image src={props.avatars[1].img_url} avatar />
                <Form.Radio
                    label='male 1'
                    value='6'
                    checked={props.user.avatar === '6'}
                    onChange={props.handleOnChange}
                />
                <Image src={props.avatars[5].img_url} avatar />
                <Form.Radio
                    label='female 2'
                    value='3'
                    checked={props.user.avatar === '3'}
                    onChange={props.handleOnChange}
                />
                <Image src={props.avatars[2].img_url} avatar />
                <Form.Radio
                    label='male 2'
                    value='7'
                    checked={props.user.avatar === '7'}
                    onChange={props.handleOnChange}
                />
                <Image src={props.avatars[6].img_url} avatar />
                <Form.Radio
                    label='female 3'
                    value='4'
                    checked={props.user.avatar === '4'}
                    onChange={props.handleOnChange}
                />
                <Image src={props.avatars[3].img_url} avatar />
                <Form.Radio
                    label='male 3'
                    value='8'
                    checked={props.user.avatar === '8'}
                    onChange={props.handleOnChange}
                />
                <Image src={props.avatars[7].img_url} avatar />
                <Form.Radio
                    label='female 4'
                    value='5'
                    checked={props.user.avatar === '5'}
                    onChange={props.handleOnChange}
                />
                <Image src={props.avatars[4].img_url} avatar />
                <Form.Radio
                    label='male 4'
                    value='9'
                    checked={props.user.avatar === '9'}
                    onChange={props.handleOnChange}
                />
                <Image src={props.avatars[8].img_url} avatar />
            </Form.Group>
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
            <select value={props.user.distance} onChange={props.handleOnChange} name='distance'>
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
            <select value={props.user.results} onChange={props.handleOnChange} name='results'>
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