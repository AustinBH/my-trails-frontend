import React, { Component } from 'react'
import { Button, Modal, Form, Icon, TextArea, Label, Placeholder, Comment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { api } from '../services/api';
import { fetchAuthentication } from '../actions/userActions'


class CommentHolder extends Component {

    state = {
        open: false,
        editOpen: false,
        comments: [],
        content: '',
        editingContent: '',
        editingId: '',
        isLoading: 'false'
    }

    componentDidMount() {
        this.fetchTrailComments()
        this.props.fetchAuthentication()
    }

    fetchTrailComments = () => {
        this.setState({ isLoading: true })
        api.comments.getCommentsByTrail(this.props.trail.id).then(json => this.setState({ comments: json, isLoading: false }))
    }

    handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    open = () => this.setState({open: true})
    close = () => this.setState({open: false})
    toggleEdit = comment => this.setState({editOpen: !this.state.editOpen, editingContent: comment.content, editingId: comment.id })
    deleteComment = comment => api.comments.deleteComment(comment).then(this.setState({comments: this.state.comments.filter(element => element.id !== comment.id)}))

    handleSubmit = ev => {
        ev.preventDefault()
        if (ev.target.name === 'create') {
            let comment = { content: this.state.content, user_id: this.props.user.id, trail_id: this.props.trail.id }
            api.comments.addComment({ comment: comment }).then(json => {
                if (!json.error) {
                    this.setState({ comments: [...this.state.comments, json], content: '' })
                }
            })
            this.close()
        } else {
            let comment = { content: this.state.editingContent, id: this.state.editingId }
            api.comments.editComment({ comment: comment }).then(json => {
                if (!json.error) {
                    let updatedComment = json
                    let currentComments = [...this.state.comments.filter(comment => comment.id !== json.id), updatedComment]
                    this.setState({ comments: currentComments })
                }
            })
            this.toggleEdit('')
        }
    }

    render() {
        return <>
            <Comment.Group>
                <Header as='h3' dividing >Comments</Header>
                {this.state.isLoading ?
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                :
                    this.state.comments.length > 0 ? this.state.comments.map((comment, idx) => {
                            return <Comment key={idx}>
                                <Comment.Author as='a'>{comment.username}</Comment.Author>
                                <Comment.Metadata>
                                    {comment.created_at}
                                </Comment.Metadata>
                                <Comment.Text>{comment.content}</Comment.Text>
                                {comment.user_id === this.props.user.id ?
                                <>
                                <Button size='small' color='yellow' onClick={() => this.toggleEdit(comment)} content='Edit'/>
                                <Button size='small' color='red' onClick={() => this.deleteComment(comment)} content='Delete'/>
                                </>
                                    :
                                 null}
                            </Comment>
                    })
                    :
                    <Comment>
                        <Comment.Text>No comments yet, leave the first one!</Comment.Text>
                    </Comment>
                }
                
            </Comment.Group>
            <Modal onClose={() => this.toggleEdit('')} open={this.state.editOpen} closeIcon>
                <Modal.Header>Edit Comment</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.handleSubmit} className='standard-form' name='edit'>
                            <Form.Field>
                                <Label color='brown' as='a'>
                                    <Icon name='content' />
                                    Content
                                </Label>
                                <TextArea value={this.state.editingContent} onChange={this.handleChange} name='editingContent' required />
                            </Form.Field>
                            <Button color='blue' type='submit' content='Edit Comment' />
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
            <Modal onOpen={this.open} onClose={this.close} open={this.state.open} trigger={<Button color='purple' content='New Comment'/>} closeIcon>
                <Modal.Header>New Comment</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form onSubmit={this.handleSubmit} className='standard-form' name='create'>
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

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentHolder);