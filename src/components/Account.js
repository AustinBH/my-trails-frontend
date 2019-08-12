import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'semantic-ui-react';
import { fetchAuthentication } from '../actions/userActions';
import EditAccount from './EditAccount';

class Account extends Component {

    state = {
        isLoading: true
    }

    // We just want to make sure that we get the user's account info
    componentDidMount() {
        this.props.fetchAuthentication().then(this.setState({isLoading: false}))
    }

    render() {
        return <div>
            <h1>Account</h1>
            <>
                <Image src='https://cdn.compliancesigns.com/media/parking-control/150/Trail-Sign-PKE-17206_150.gif' avatar/>
                <p>Welcome back {this.props.user && this.props.user.username}!!</p>
            </>
            {this.state.isLoading ? 
                null
            :
                <EditAccount user={this.props.user} history={this.props.history} />
            }
            <Button color='brown' icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </div>
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);