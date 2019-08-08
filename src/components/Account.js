import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { fetchAuthentication } from '../actions/userActions';
import EditAccount from './EditAccount';

class Account extends Component {

    componentDidMount() {
        this.props.fetchAuthentication()
    }

    render() {
        return <div>
            <h1>Account</h1>
            <p>Welcome back {this.props.user && this.props.user.username}!!</p>
            <EditAccount user={this.props.user}/>
            <Button icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
            <Button icon='power off' onClick={() => this.props.logout()} content='Logout' />
        </div>
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication()),
    logout: () => dispatch({type: 'LOGOUT'})
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);