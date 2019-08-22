import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'semantic-ui-react';
import { fetchAuthentication } from '../actions/userActions';
import { fetchAvatars } from '../actions/avatarActions';
import EditAccount from './EditAccount';
import BasicLoader from './BasicLoader';
import ErrorModal from './auth/ErrorModal';
import DeleteAccountModal from './auth/DeleteAccountModal';
import { api } from '../services/api';

class Account extends Component {

    state = {
        isLoading: true,
        error: '',
        open: false,
        deleteOpen: false,
        password: ''
    }

    // We just want to make sure that we get the user's account info and all available avatars (placeholder stage)
    componentDidMount() {
        this.props.fetchAuthentication().then(this.setState({isLoading: false}))
        this.props.fetchAvatars()
    }

    toggleModal = () => {
        this.setState({ open: !this.state.open })
    }

    // We need to fetch again so that we can display our welcome message and avatar image
    displayError = error => {
        this.setState({ error: error })
        this.toggleModal()
        this.props.fetchAuthentication()
    }

    toggleAccountModal = () => {
        this.setState({ deleteOpen: !this.state.deleteOpen })
    }

    handleChange = ev => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        api.auth.deleteAccount({user: {password: this.state.password} }).then(json => {
            this.toggleAccountModal()
            if (json.error) {
                this.displayError(json.error)
            } else {
                this.props.logout()
            }
        })
    }

    render() {
        return <>
            <h1>Account</h1>
            {this.props.user && this.props.user.avatar && <Image src={this.props.user.avatar.img_url} avatar/>}
            <p>Welcome back {this.props.user && this.props.user.username}!!</p>
            <DeleteAccountModal open={this.state.deleteOpen} toggle={this.toggleAccountModal} handleOnChange={this.handleChange} handleOnSubmit={this.handleSubmit} />
            {this.state.isLoading ? 
                <BasicLoader info='your info' />
            :
                <>
                <ErrorModal error={this.state.error} open={this.state.open} toggle={this.toggleModal} />
                <EditAccount displayError={this.displayError} user={this.props.user} history={this.props.history} avatars={this.props.avatars} />
                </>
            }
            <Button color='brown' icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </>
    }
}

const mapStateToProps = state => {
    return { user: state.user.user, avatars: state.avatars }
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication()),
    fetchAvatars: () => dispatch(fetchAvatars()),
    logout: () => dispatch({ type: 'LOGOUT' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);