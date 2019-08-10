import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import GoogleMap from './GoogleMap'
import { api } from '../services/api';
import SearchResults from '../containers/SearchResults';
import { fetchAuthentication } from '../actions/userActions';

class Search extends Component {

    state = {
        locations: [],
        trails: [],
        selectedLocation: {
            lat: '',
            lng: ''
        },
        isLoading: false
    }

    componentDidMount() {
        api.locations.getLocations().then(json => this.setState({locations: json}))
    }

    handleClick = (ev, location) => {
        if (this.props.user.id) {
            if (this.state.trails.length === 0) {
                let lat = location.latitude
                let lon = location.longitude
                api.trails.getTrailsByLocation(lat, lon).then(json => this.setState({
                    trails: json,
                    selectedLocation: {
                        lat: lat,
                        lng: lon
                    }
                }))
            } else {
                this.setState({
                    trails: [], selectedLocation: {
                        lat: '',
                        lng: ''
                    }
                })
            }
        } else {
            this.setState({isLoading: true})
            this.props.fetchAuthentication().then(
                this.setState({isLoading: false})
            )
        }
    }

    render() {
        return <div>
            <h1>Search</h1>
            <>
                <Button.Group vertical>
                    {this.state.locations.map(location => {
                    return <Button color='brown'
                        loading={this.state.isLoading}
                        key={location.id}
                        id={location.id}
                        icon='map signs'
                        onClick={(event) => this.handleClick(event, location)}
                        content={location.name}/>
                    })}
                </Button.Group>
            </>
            <GoogleMap lat={this.state.selectedLocation.lat} lng={this.state.selectedLocation.lng} trails={this.state.trails} />
            {this.state.trails && this.state.trails.length > 0 ?
                <div className='table-holder'>
                    <SearchResults trails={this.state.trails} user={this.props.user} />
                </div>
            :
                null
            }
            <Button color='teal' icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </div>
    }
}

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);