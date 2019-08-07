import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInput from '../components/UserInput';

class UserContainer extends Component {
    render() {
        return(
            <div>
                <UserInput login={this.props.login} signup={this.props.signup} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    login: user => dispatch({ type: 'LOGIN', user}),
    signup: user => dispatch({ type: 'SIGNUP', user})
})

export default connect(null, mapDispatchToProps)(UserContainer);