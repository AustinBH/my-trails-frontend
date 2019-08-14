import React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react';

const ErrorModal = props => {

    return <Modal onClose={props.toggle} open={props.open} closeIcon>
        <Modal.Header>Error</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                {props.error}
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='green' onClick={props.toggle}>
                <Icon name='check' /> Ok
            </Button>
        </Modal.Actions>
    </Modal>
}

export default ErrorModal;