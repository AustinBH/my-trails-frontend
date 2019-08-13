import React, { Component } from 'react'
import { Button, Placeholder, Comment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { api } from '../services/api';
import { fetchAuthentication } from '../actions/userActions'
import NewCommentModal from './commentModals/NewCommentModal';
import EditCommentmodal from './commentModals/EditCommentModal';
import DeleteCommentModal from './commentModals/DeleteCommentModal';


class CommentHolder extends Component {

    state = {
        open: false,
        editOpen: false,
        deleteOpen: false,
        comments: [],
        content: '',
        editingContent: '',
        editingId: '',
        deletingId: '',
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

    // This function toggles our new comment modal
    toggleNew = () => this.setState({ open: !this.state.open })

    // This function toggles the edit modal and adds a specific comment's information to the modal for editing.
    toggleEdit = comment => this.setState({ editOpen: !this.state.editOpen, editingContent: comment.content, editingId: comment.id })

    // This function toggles our delete comment modal
    toggleDelete = comment => this.setState({ deleteOpen: !this.state.deleteOpen, deletingId: comment.id })

    // This function deletes a user's comment and closes the delete modal
    deleteComment = id => {
        api.comments.deleteComment({id: id}).then(this.setState({ comments: this.state.comments.filter(element => element.id !== id), deletingId: '' }))
        this.toggleDelete({id: ''})
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
            this.toggleNew()
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
                                <Comment.Avatar src={comment.avatar} />
                                <Comment.Author as='a'>{comment.username}</Comment.Author>
                                <Comment.Metadata>
                                    {comment.created_at}
                                </Comment.Metadata>
                                <Comment.Text>{comment.content}</Comment.Text>
                                {comment.user_id === this.props.user.id ?
                                    <>
                                    <Button size='mini' color='yellow' onClick={() => this.toggleEdit(comment)} content='Edit'/>
                                    <Button size='mini' negative onClick={() => this.toggleDelete(comment)} content='Delete'/>
                                    </>
                                :
                                    null
                                }
                            </Comment>
                    })
                    :
                    <Comment>
                        <Comment.Text>No comments yet, leave the first one!</Comment.Text>
                    </Comment>
                }
                
            </Comment.Group>
            <DeleteCommentModal open={this.state.deleteOpen} toggle={this.toggleDelete} id={this.state.deletingId} deleteComment={this.deleteComment}/>
            <EditCommentmodal open={this.state.editOpen} toggle={this.toggleEdit} handleOnSubmit={this.handleSubmit} value={this.state.editingContent} handleOnChange={this.handleChange} />
            <NewCommentModal toggle={this.toggleNew} open={this.state.open} handleOnSubmit={this.handleSubmit} value={this.state.content} handleOnChange={this.handleChange} />
        </>
    }
}

const mapStateToProps = state => {
    return {user: state.user.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentHolder);