import React, { Component} from 'react';
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/userActions';
import { api } from '../services/api';
import SearchData from '../components/SearchData';


class SearchResults extends Component {

    componentDidMount() {
        this.props.fetchAuthentication()
    }

    handleClick = (ev, data) => {
        let button = ev.target

        switch (button.name) {
            case 'fav':
                let favorite = {trail_id: data.id, user_id: this.props.user.id}
                if (!button.className.includes('orange')) {
                    api.favorites.addFavorite({ like: favorite }).then(json => {button.className = 'ui orange button'})
                } else {
                    api.favorites.deleteFavorite({ like: favorite}).then(json => {button.className = 'ui button'})
                }
                return this.props.fetchAuthentication()
            case 'complete':
                let complete = {trail_id: data.id, user_id: this.props.user.id}
                if (!button.className.includes('green')) {
                    api.completedHikes.addCompletedHike({ completed_hike: complete }).then(json => { button.className = 'ui green button' })
                } else {
                    api.completedHikes.deleteCompletedHike({ completed_hike: complete}).then(json => { button.className = 'ui button'})
                }
                return this.props.fetchAuthentication()
            case 'comments':
                return this.props.fetchAuthentication()
            case 'info':
                return this.props.fetchAuthentication()
            default:
                return null
        }
    }
 
    render() {
        return <SearchData trails={this.props.trails} handleClick={this.handleClick} user={this.props.user} />
    }
}

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);