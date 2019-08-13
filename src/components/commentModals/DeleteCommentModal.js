import React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react';

const DeleteCommentModal = props => {
    return <Modal onClose={props.toggle} open={props.open} closeIcon>
        <Modal.Header>Delete Comment</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                Are you sure? 
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='red' onClick={props.toggle}>
                <Icon name='remove' /> No
            </Button>
            <Button color='green' onClick={() => props.deleteComment(props.id)}>
                <Icon name='checkmark' /> Yes
            </Button>
        </Modal.Actions>
    </Modal>
}

export default DeleteCommentModal;