import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'semantic-ui-react';
import { fetchAuthentication } from '../actions/userActions';
import { fetchAvatars } from '../actions/avatarActions';
import EditAccount from './EditAccount';
import BasicLoader from './BasicLoader';

class Account extends Component {

    state = {
        isLoading: true
    }

    // We just want to make sure that we get the user's account info and all available avatars (placeholder stage)
    componentDidMount() {
        this.props.fetchAuthentication().then(this.setState({isLoading: false}))
        this.props.fetchAvatars()
    }

    render() {
        return <div>
            <h1>Account</h1>
            <>
                {this.props.user && this.props.user.avatar && <Image src={this.props.user.avatar.img_url} avatar/>}
                <p>Welcome back {this.props.user && this.props.user.username}!!</p>
            </>
            {this.state.isLoading ? 
                <BasicLoader info='your info' />
            :
                <EditAccount user={this.props.user} history={this.props.history} avatars={this.props.avatars} />
            }
            <Button color='brown' icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </div>
    }
}

const mapStateToProps = state => {
    return { user: state.user.user, avatars: state.avatars.avatars }
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication()),
    fetchAvatars: () => dispatch(fetchAvatars())
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);