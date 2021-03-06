import React from 'react'
import { Modal, Button, Form, Label } from 'semantic-ui-react';

// Here are the options for the select menu
const options = [
    { key: 10, text: 'Ten', value: 10},
    { key: 20, text: 'Twenty', value: 20},
    { key: 30, text: 'Thirty', value: 30},
    { key: 40, text: 'Fourty', value: 40},
    { key: 50, text: 'Fifty', value: 50},
]

const SearchSettingsModal = props => {
    return <Modal onOpen={props.toggle} onClose={props.toggle} open={props.open} trigger={<Button className='home-button' icon='settings' color='green' content='Settings' />} closeIcon>
        <Modal.Header content='Search Settings' />
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={props.handleOnSubmit} className='standard-form' name='settings'>
                    <Form.Group widths='equal'>
                        <Form.Field className='modal-form'>
                            <Label color='brown' as='a' icon='bicycle' content='Range (miles)' />
                            <Form.Select value={props.range} onChange={props.handleOnChange} options={options} name='distance' placeholder='Select a range' selection required />
                        </Form.Field>
                        <Form.Field className='modal-form'>
                            <Label color='brown' as='a' icon='flag' content='Results (trails)' />
                            <Form.Select value={props.results} onChange={props.handleOnChange} options={options} name='results' placeholder='Select the number of trails' selection required />
                        </Form.Field>
                    </Form.Group>
                    <Button className='home-button' color='blue' type='submit' content='Save' />
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
}

export default SearchSettingsModal;