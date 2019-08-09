import React, { Component } from 'react'
import { Grid, Button, Modal, Form, Icon, TextArea, Label } from 'semantic-ui-react';
import { api } from '../services/api';


class CommentHolder extends Component {

    state = {
        open: false,
        comments: [],
        content: ''
    }

    componentDidMount() {
        api.comments.getCommentsByTrail(this.props.trail.id).then(json => this.setState({comments: [json]}))
    }

    handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    open = () => this.setState({open: true})
    close = () => this.setState({open: false})

    handleSubmit = ev => {
        ev.preventDefault()
        this.close()
    }

    render() {
        return <>
            <Grid columns={1} divided>
                {this.state.comments[0] && this.state.comments[0].content && this.state.comments.map((comment, idx) => {
                    return <Grid.Row key={idx}>
                        <Grid.Column>
                            <Label color='brown'>User:</Label>
                            <p>{comment.username}</p>
                            <Label color='brown'>Content:</Label>
                            <p>{comment.content}</p>
                        </Grid.Column>
                    </Grid.Row>
                })}
            </Grid>
            <Modal onOpen={this.open} onClose={this.close} open={this.state.open}trigger={<Button className='comment-button'>New Comment</Button>} closeIcon>
                <Modal.Header>New Comment</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.handleSubmit} className='standard-form' name='login'>
                            <Form.Field>
                                <Label color='brown' as='a'>
                                    <Icon name='content' />
                                    Content
                                </Label>
                                <TextArea value={this.state.content} onChange={this.handleChange} name='content' required />
                            </Form.Field>
                            <Button color='blue' type='submit' content='Add Comment' />
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>

        </>
    }
}

export default CommentHolder;