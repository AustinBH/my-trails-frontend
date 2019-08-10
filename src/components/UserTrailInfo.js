import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import SearchData from '../containers/SearchData';
import { api } from '../services/api';
import { buttonSwitcher } from '../services/buttonSwitcher';
import { fetchAuthentication } from '../actions/userActions';

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

    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.fetchAuthentication().then(this.props.hikes === 'completed' ? this.fetchCompletedTrails : this.fetchLikedTrails)
    }

    fetchLikedTrails = () => {
        if (this.props.user && this.props.user.likes.length > 0) {
            let trails = this.props.user.likes.map(like => like.trail_id)
            api.trails.getTrailsById(trails).then(json => this.setState({ trails: json, isLoading: false }))
        } else {
            this.setState({isLoading: false})
        }
    }

    fetchCompletedTrails = () => {
        if (this.props.user && this.props.user.completed_hikes.length > 0) {
            let trails = this.props.user.completed_hikes.map(completed_hike => completed_hike.trail_id)
            api.trails.getTrailsById(trails).then(json => this.setState({ trails: json, isLoading: false }))
        } else {
            this.setState({isLoading: false})
        }
    }

    handleClick = (ev, data) => {
        if (buttonSwitcher(ev, data, this.props) && buttonSwitcher(ev, data, this.props)[0] === 'info') {
            this.setState({
                info: {
                    id: buttonSwitcher(ev, data, this.props)[1],
                    hidden: !this.state.info.hidden
                }
            })
        } else if (buttonSwitcher(ev, data, this.props) && buttonSwitcher(ev, data, this.props)[0] === 'comment') {
            this.setState({
                comments: {
                    id: buttonSwitcher(ev, data, this.props)[1],
                    hidden: !this.state.comments.hidden
                }
            })
        }
        buttonSwitcher(ev, data, this.props)
    }

    render() {
        return <>
        {
            this.state.isLoading ?
                    <div className='info-holder'>
                        <Segment className='info-loader'>
                            <Dimmer active>
                                <Loader>Getting Hikes...</Loader>
                            </Dimmer>
                        </Segment>
                    </div> 
            :

            this.state.trails.length > 0 ?
                <div className='user-search-holder'>
                    <SearchData
                        trails={this.state.trails}
                        user={this.props.user}
                        handleClick={this.handleClick}
                        info={this.state.info}
                        comments={this.state.comments}
                    />
                </div>
            :
                <p>You don't have any {this.props.hikes} hikes!!</p>
        }
        </>
    }
}


const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserTrailInfo);