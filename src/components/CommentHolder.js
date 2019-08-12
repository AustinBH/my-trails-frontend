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

    // Here we have to fetch the comments for a trail and fetch our user info incase someone has refreshed the page
    componentDidMount() {
        this.fetchTrailComments()
        this.props.fetchAuthentication()
    }

    // This function adds a loading indicator while waiting to get comment information for a specific trail
    fetchTrailComments = () => {
        this.setState({ isLoading: true })
        api.comments.getCommentsByTrail(this.props.trail.id).then(json => this.setState({ comments: json, isLoading: false }))
    }

    // This function allows us to control our new comment and edit comment forms
    handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    // Our forms are contained within modals so we manage both the form and the modal with state
    open = () => this.setState({open: true})
    close = () => this.setState({open: false})

    // This function is not an open and close like the new comment modal but rather a toggle to add a specific comment's information to the modal for editing.
    toggleEdit = comment => this.setState({editOpen: !this.state.editOpen, editingContent: comment.content, editingId: comment.id })

    // This function confirms that the user wants to delete a comment before deleting it
    deleteComment = comment => {
        if (window.confirm('Are you sure you want to delete this comment?') === true) {
            api.comments.deleteComment(comment).then(this.setState({ comments: this.state.comments.filter(element => element.id !== comment.id) }))
        }
    }

    // This function manages our edit and create forms and sends an appropriate fetch depending on what the user selected.
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
                { // Here we are using a ternary to add a placeholder while we fetch the comments
                    this.state.isLoading ?
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
                    // This nested ternary allows us to either render a standard no comments yet message or the comments for a trail
                    this.state.comments.length > 0 ? this.state.comments.map((comment, idx) => {
                            return <Comment key={idx}>
                                <Comment.Author as='a'>{comment.username}</Comment.Author>
                                <Comment.Metadata>
                                    {comment.created_at}
                                </Comment.Metadata>
                                <Comment.Text>{comment.content}</Comment.Text>
                                {comment.user_id === this.props.user.id ?
                                <>
                                <Button size='mini' color='yellow' onClick={() => this.toggleEdit(comment)} content='Edit'/>
                                <Button size='mini' negative onClick={() => this.deleteComment(comment)} content='Delete'/>
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
            {/* Going to abstract these modals into their own components and possibly consolidate into 1 component based on what a user clicks */}
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
                                <TextArea value={this.state.content} onChange={this.handleChange} name='content' placeholder='Add a new comment' required />
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