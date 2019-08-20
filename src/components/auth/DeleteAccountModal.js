import React, { useState } from 'react'
import { Modal, Button, Form, Label } from 'semantic-ui-react';

const DeleteAccountModal = props => {

    // Adding hooks so that we can clear the secondary menu created when a user confirms they want to close their account
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
        props.toggle()
    }

    return <Modal onClose={handleClose} onOpen={props.toggle} open={props.open} trigger={<Button className='account-button' negative content='Delete Account' icon='trash alternate' />} closeIcon>
        <Modal.Header>Delete My Account</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                Are you sure?
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='red' onClick={props.toggle} icon='remove' content='No'/>
            <Button color='green' onClick={() => setShow(!show)} icon='check' content='Yes'/>
        </Modal.Actions>
        {show ?
            <Modal.Content>
                <Modal.Description>
                    <Form onSubmit={props.handleOnSubmit} className='standard-form' name='delete'>
                        <Form.Field style={{display: 'none'}}>
                            <Label color='brown' as='a' icon='user' content='Username' />
                            <Form.Input type='text' value={props.username} onChange={props.handleOnChange} placeholder='Enter your username' autoComplete='current-username' name='username' />
                        </Form.Field>
                        <Form.Field className='modal-form'>
                            <h3>Enter your password</h3>
                            <Label color='brown' as='a' icon='lock' content='Password' />
                            <Form.Input type='password' value={props.password} onChange={props.handleOnChange} autoComplete='current-password' name='password' required />
                        </Form.Field>
                        <Button className='home-button' color='blue' type='submit' content='Delete Account' />
                    </Form>
                </Modal.Description>
            </Modal.Content>
            :
            null
        }
    </Modal>
}

export default DeleteAccountModal;