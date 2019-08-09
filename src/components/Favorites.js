import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SearchData from '../containers/SearchData';
import { api } from '../services/api';
import { buttonSwitcher } from '../services/buttonSwitcher';
import { fetchAuthentication } from '../actions/userActions';

class Favorites extends Component {
    state={
        trails: [],
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
        this.props.fetchAuthentication().then(this.fetchLikedTrails)
    }

    fetchLikedTrails = () => {
        if (this.props.user.likes && this.props.user.likes.length > 0) {
            let trails = this.props.user.likes.map(like => like.trail_id)
            api.trails.getTrailsById(trails).then(json => this.setState({trails: json}))
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
            <h1>Your Favorite Hikes</h1>
            <SearchData trails={this.state.trails} user={this.props.user} handleClick={this.handleClick} info={this.state.info} comments={this.state.comments}/>
            <Button color='teal' icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </>
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);