import React from 'react'
import { Modal, Button, Form, Label, Icon, TextArea } from 'semantic-ui-react';

const NewCommentModal = props => {
    return <Modal onOpen={props.toggle} onClose={props.toggle} open={props.open} trigger={<Button color='purple' content='New Comment' />} closeIcon>
        <Modal.Header>New Comment</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={props.handleOnSubmit} className='standard-form' name='create'>
                    <Form.Field>
                        <Label color='brown' as='a'>
                            <Icon name='content' />
                            Content
                                </Label>
                        <TextArea value={props.value} onChange={props.handleOnChange} name='content' placeholder='Add a new comment' required />
                    </Form.Field>
                    <Button color='blue' type='submit' content='Add Comment' />
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
}

export default NewCommentModal;