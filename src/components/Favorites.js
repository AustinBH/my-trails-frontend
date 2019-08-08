import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SearchData from './SearchData';
import { api } from '../services/api';
import { buttonSwitcher } from '../services/buttonSwitcher';
import { fetchAuthentication } from '../actions/userActions';

class Favorites extends Component {
    state={
        trails: [],
        hidden: {
            id: '',
            status: true
        }
    }

    componentDidMount() {
        this.props.fetchAuthentication().then(
            this.fetchLikedTrails()
        )
    }

    fetchLikedTrails() {
        if (this.props.user.likes && this.props.user.likes.length > 0) {
            let trails = this.props.user.likes.map(like => like.trail_id)
            api.trails.getTrailsById(trails).then(json => this.setState({trails: json}))
        }
    }

    handleClick = (ev, data) => {
        if (typeof buttonSwitcher(ev, data, this.props) === 'number') {
            this.setState({
                hidden: {
                    id: buttonSwitcher(ev, data, this.props),
                    status: !this.state.hidden.status
                }
            })
        }
        buttonSwitcher(ev, data, this.props)
    }

    render() {
        return <>
            <h1>Favorites</h1>
            <SearchData trails={this.state.trails} user={this.props.user} handleClick={this.handleClick} hidden={this.state.hidden}/>
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