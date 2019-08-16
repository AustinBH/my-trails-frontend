import React from 'react'
import { Modal, Button, Form, Label, Icon, Dropdown } from 'semantic-ui-react';

const options = [
    { key: 10, text: 'Ten', value: 10},
    { key: 20, text: 'Twenty', value: 20},
    { key: 30, text: 'Thirty', value: 30},
    { key: 40, text: 'Fourty', value: 40},
    { key: 50, text: 'Fifty', value: 50},
]

const NewCommentModal = props => {
    return <Modal onOpen={props.toggle} onClose={props.toggle} open={props.open} closeIcon>
        <Modal.Header>Search Settings</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={props.handleOnSubmit} className='standard-form' name='settings'>
                    <Form.Field>
                        <Label color='brown' as='a'>
                            <Icon name='bicycle' />
                            Range (miles)
                        </Label>
                        <Dropdown value={props.range} onChange={props.handleOnChange} options={options} id='distance' placeholder='Select a range' selection required />
                    </Form.Field>
                    <Form.Field>
                        <Label color='brown' as='a'>
                            <Icon name='flag' />
                            Results (trails)
                        </Label>
                        <Dropdown value={props.results} onChange={props.handleOnChange} options={options} id='results' placeholder='Select the number of trails' selection required />
                    </Form.Field>
                    <Button color='blue' type='submit' content='Save' />
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
}

export default NewCommentModal;