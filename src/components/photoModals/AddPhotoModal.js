import React from 'react'
import { Modal, Form, Button } from 'semantic-ui-react';
import BasicLoader from '../BasicLoader';

const AddPhotoModal = props => {
    return <Modal onOpen={props.toggle} onClose={props.toggle} open={props.open} trigger={<Button icon='write' color='purple' content='New Photo' />} closeIcon>
        <Modal.Header>New Photo</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                {props.loading ?
                <BasicLoader info='image' />
                :
                <Form onSubmit={props.handleOnSubmit} className='standard-form' name='create'>
                    <Form.Field>
                        <Form.Input iconPosition='left' icon='image' type='file' accept='image/*' onChange={props.handleOnChange} name='photo' placeholder='Add a new photo' />
                    </Form.Field>
                    <Button className='home-button' color='blue' type='submit' content='Add Photo' />
                </Form>
                }
            </Modal.Description>
        </Modal.Content>
    </Modal>
}

export default AddPhotoModal;