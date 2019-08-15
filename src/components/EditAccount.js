import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchEdit } from '../actions/userActions';
import EditForm from './EditForm';

class EditAccount extends Component {
    state = {
        username: '',
        password: '',
        newPassword: '',
        avatar: '',
        distance: 20,
        results: 20
        }


    // This function just controls our form and updates the state accordingly
    handleChange = (ev, value ) => {
        if (ev.target.name) {
            this.setState({
                [ev.target.name]: ev.target.value
            })
        } else {
            this.setState({
                avatar: value.value
            })
        }
    }

    // This function just manages the form submission and confirms whether a user has provided a new password or username and updates their account accordingly
    // After a user's account is updated we redirect them back to the home page
    handleSubmit = ev => {
        ev.preventDefault()
        let user = {}
        let avatar = ''
        // These if statements allow us to update the user's avatar if they changed it or keep it the same if they did not
        if (this.state.avatar !== '' && this.state.avatar !== this.props.user.avatar.id) {
            avatar = parseInt(this.state.avatar)
        } else {
            avatar = parseInt(this.props.user.avatar.id)
        }
        if (!this.state.newPassword) {
            user = { username: this.state.username || this.props.user.username, password: this.state.password, distance: parseInt(this.state.distance), results: parseInt(this.state.results), avatar_id: avatar}
            this.props.fetchEdit({ ...user }).then(action => {
                if (!action.payload.error) {
                    this.props.history.push('/')
                } else {
                    this.props.displayError(action.payload.error)
                }
            })
        } else {
            user = { username: this.state.username || this.props.user.username, password: this.state.password, new_password: this.state.newPassword, distance: parseInt(this.state.distance), results: parseInt(this.state.results), avatar_id: avatar}
            this.props.fetchEdit({...user}).then(action => {
                if (!action.payload.error) {
                    this.props.history.push('/')
                } else {
                    this.props.displayError(action.payload.error)
                }
            })
        }
    }



    render() {
        return <>
            <h1>Edit My Account Info</h1>
            {this.props.avatars ?
                <EditForm user={{ ...this.state }} handleOnChange={this.handleChange} handleOnSubmit={this.handleSubmit} avatars={this.props.avatars} />
            :
                null
            }
        </>
    }
}

const mapDispatchToProps = dispatch => ({
    fetchEdit: (data) => dispatch(fetchEdit(data))
})

export default connect(null, mapDispatchToProps)(EditAccount);