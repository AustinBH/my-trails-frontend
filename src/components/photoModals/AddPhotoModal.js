import React from 'react'
import { Modal, Form, Button, Label } from 'semantic-ui-react';

const AddPhotoModal = props => {
    return <Modal onOpen={props.toggle} onClose={props.toggle} open={props.open} trigger={<Button icon='write' color='purple' content='New Photo' />} closeIcon>
        <Modal.Header>New Photo</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={props.handleOnSubmit} className='standard-form' name='create'>
                    <Form.Field>
                        <Label color='brown' as='a' icon='photo' content='Photo' />
                        <Form.Input type='text' value={props.value} onChange={props.handleOnChange} name='photoUrl' placeholder='Add a new photo url' required />
                    </Form.Field>
                    <Button className='home-button' color='blue' type='submit' content='Add Photo' />
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
}

export default AddPhotoModal;