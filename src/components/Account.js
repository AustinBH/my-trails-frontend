import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'semantic-ui-react';
import { fetchAuthentication } from '../actions/userActions';
import EditAccount from './EditAccount';

class Account extends Component {

    componentDidMount() {
        this.props.fetchAuthentication()
    }

    render() {
        return <div>
            <h1>Account</h1>
            <>
                <Image src='https://cdn.compliancesigns.com/media/parking-control/150/Trail-Sign-PKE-17206_150.gif' avatar/>
                <p>Welcome back {this.props.user && this.props.user.username}!!</p>
            </>
            <EditAccount user={this.props.user} history={this.props.history} />
            <Button color='teal' icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
            <Button color='red' icon='power off' onClick={() => this.props.logout()} content='Logout' />
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