import React from 'react'
import { Modal, Button, Form, Label, TextArea } from 'semantic-ui-react';

const EditCommentModal = props => {
    return <Modal onClose={() => props.toggle('')} open={props.open} closeIcon>
        <Modal.Header>Edit Comment</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={props.handleOnSubmit} className='standard-form' name='edit'>
                    <Form.Field>
                        <Label color='brown' as='a' icon='content' content='Content' />
                        <TextArea value={props.value} onChange={props.handleOnChange} name='editingContent' required />
                    </Form.Field>
                    <Button className='home-button' color='blue' type='submit' content='Edit Comment' />
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
}

export default EditCommentModal;