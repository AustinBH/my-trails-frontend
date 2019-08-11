import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchEdit } from '../actions/userActions';
import EditForm from './EditForm';

class EditAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            newPassword: '',
            distance: 20,
            results: 20,
        }
    }

    handleChange = ev => {
        this.setState({
             [ev.target.name]: ev.target.value
        })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        let user = {}
        if (!this.state.newPassword) {
            user = { username: this.state.username || this.props.user.username, password: this.state.password, distance: parseInt(this.state.distance), results: parseInt(this.state.results)}
            this.props.fetchEdit({...user})
        } else {
            user = { username: this.state.username || this.props.user.username, password: this.state.password, new_password: this.state.newPassword, distance: parseInt(this.state.distance), results: parseInt(this.state.results)}
            this.props.fetchEdit({...user})
        }
        this.props.history.push('/')
    }

    render() {
        return <>
            <h1>Edit My Account Info</h1>
            <EditForm user={{...this.state}} handleOnChange={this.handleChange} handleOnSubmit={this.handleSubmit}/>
        </>
    }
}

const mapDispatchToProps = dispatch => ({
    fetchEdit: (data) => dispatch(fetchEdit(data))
})

export default connect(null, mapDispatchToProps)(EditAccount);