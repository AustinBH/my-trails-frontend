import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResults from '../containers/SearchResults';
import { api } from '../services/api';
import { fetchAuthentication } from '../actions/userActions';
import BasicLoader from './BasicLoader';

class UserTrailInfo extends Component {
    state = {
        trails: [],
        isLoading: false,
        info: {
            id: '',
            hidden: true
        },
        comments: {
            id: '',
            hidden: true
        }
    }

    // Here we need to check which type of trails we are fetching and then fetch the appropriate type
    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.fetchAuthentication().then(this.props.hikes === 'completed' ? this.fetchCompletedTrails : this.fetchLikedTrails)
    }

    // We are using an and statement to prevent checking for user information before the props have loaded correctly
    fetchLikedTrails = () => {
        if (this.props.user && this.props.user.likes.length > 0) {
            let trails = this.props.user.likes.map(like => like.trail_id)
            api.trails.getTrailsById(trails).then(json => this.setState({ trails: json, isLoading: false }))
        } else {
            this.setState({isLoading: false})
        }
    }

    // We map over the user's trail data and then get trails based on the id's of those trails
    fetchCompletedTrails = () => {
        if (this.props.user && this.props.user.completed_hikes.length > 0) {
            let trails = this.props.user.completed_hikes.map(completed_hike => completed_hike.trail_id)
            api.trails.getTrailsById(trails).then(json => this.setState({ trails: json, isLoading: false }))
        } else {
            this.setState({isLoading: false})
        }
    }

    render() {
        return this.state.isLoading ?
            <BasicLoader info='Trails' />
            :
            this.state.trails.length > 0 ?
                <div className='user-search-holder'>
                    <SearchResults
                        trails={this.state.trails}
                        user={this.props.user}
                    />
                </div>
            :
                <p>You don't have any {this.props.hikes} trails!!</p>
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTrailInfo);