import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

class Account extends Component {

    componentDidMount() {
        this.props.authenticate()
    }

    render() {
        return <div>
            <h1>Account</h1>
            <p>{this.props.user.username}</p>
            <Button icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </div>
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => ({
    authenticate: () => dispatch({ type: 'AUTHENTICATE' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);