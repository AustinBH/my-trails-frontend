import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchEdit } from '../actions/userActions';
import EditForm from './EditForm';
import { api } from '../services/api';


class EditAccount extends Component {
    //Adding a fetch to pull current user information
    constructor(){
        super()
        api.auth.getCurrentUser().then(json => this.setState({
            username: json.user.username,
            avatar: json.user.avatar.id,
            distance: json.user.distance,
            results: json.user.results
        }))
        this.state = {
            username: '',
            password: '',
            newPassword: '',
            avatar: '',
            distance: '',
            results: ''
        }
    }

    // This function just controls our form and updates the state accordingly
    // value is used with semantic ui to update the correct state as the event contains different information
    handleChange = (ev, value) => {
        this.setState({
            [value.name]: value.value
        })
    }

    // This function just manages the form submission and confirms whether a user has provided a new password or username and updates their account accordingly
    // After a user's account is updated we redirect them back to the home page
    handleSubmit = ev => {
        ev.preventDefault()
        let user = { username: this.state.username || this.props.user.username, password: this.state.password, distance: parseInt(this.state.distance) || this.props.user.distance, results: parseInt(this.state.results) || this.props.user.results}
        let avatar = ''
        // These if statements allow us to update the user's avatar if they changed it or keep it the same if they did not
        if (this.state.avatar !== '' && this.state.avatar !== this.props.user.avatar.id) {
            avatar = parseInt(this.state.avatar)
        } else {
            avatar = parseInt(this.props.user.avatar.id)
        }
        // We only want to move the user to the homepage if they successfully updated their info
        if (!this.state.newPassword) {
            user = {...user, avatar_id: avatar}
            this.props.fetchEdit({ ...user }).then(action => {
                if (!action.payload.error) {
                    this.props.history.push('/')
                } else {
                    this.props.displayError(action.payload.error)
                }
            })
        } else {
            user = {...user, new_password: this.state.newPassword, avatar_id: avatar}
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