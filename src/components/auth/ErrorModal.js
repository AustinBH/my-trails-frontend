import React from 'react'
import { Modal, Button } from 'semantic-ui-react';

const ErrorModal = props => {

    return <Modal onClose={props.toggle} open={props.open} closeIcon>
        <Modal.Header>Error</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                {props.error}
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='green' onClick={props.toggle} icon='check' content='Ok' />
        </Modal.Actions>
    </Modal>
}

export default ErrorModal;