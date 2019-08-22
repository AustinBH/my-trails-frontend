import React from 'react'
import { Modal, Button, Form, TextArea } from 'semantic-ui-react';

const NewCommentModal = props => {
    return <Modal onOpen={props.toggle} onClose={() => props.toggle('')} open={props.open} trigger={ props.info === 'New' ? <Button icon='write' color='purple' content='New Comment' /> : null} closeIcon>
        <Modal.Header>{props.info} Comment</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={props.handleOnSubmit} className='standard-form' name={props.info}>
                    <Form.Field label='Content' control={TextArea} value={props.value} onChange={props.handleOnChange} name={props.info === 'New' ? 'content' : 'editingContent'} placeholder='Add a new comment' required />
                    <Button className='home-button' color='blue' type='submit' content='Add Comment' />
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
}

export default NewCommentModal;