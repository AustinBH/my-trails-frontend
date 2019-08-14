import React, { Component } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { api } from '../services/api';
import { fetchAuthentication } from '../actions/userActions';
import GoogleMap from './GoogleMap'
import SearchResults from '../containers/SearchResults';
import TrailSearchForm from './TrailSearchForm';
import BasicLoader from './BasicLoader';


class Search extends Component {

    state = {
        locations: [],
        trails: [],
        selectedLocation: {
            lat: '',
            lng: ''
        },
        isLoading: true,
        mapLoading: false
    }

    // I need to fetch the preset locations from my backend and get the user data from redux
    componentDidMount() {
        api.locations.getLocations().then(json => this.setState({locations: json, isLoading: false}))
        this.props.fetchAuthentication()
    }

    // This function clears out whatever state the user searched for prior and searches anew given a location
    handleClick = (ev, location) => {
        this.setState({
            trails: [], selectedLocation: {
                lat: '',
                lng: ''
            }, mapLoading: true
        })
        let lat = location.latitude
        let lon = location.longitude
        let distance = this.props.user.distance
        let results = this.props.user.results
        api.trails.getTrailsByLocation(lat, lon, distance, results).then(json => this.setState({
            trails: json,
            selectedLocation: {
                lat: lat,
                lng: lon
            },
            mapLoading: false
        }))
    }

    render() {
        return <div>
            <h1>Search</h1>
            {/* Adding a ternary to display a loading indicator when fetching locations */}
            {this.state.isLoading ? 
                <BasicLoader info='Locations' />
            :
                <Dropdown
                    placeholder='Select a location'
                    selection
                    options={this.state.locations.map(location => {
                        return {
                            key: location.id,
                            id: location.id,
                            value: location.name,
                            icon: 'map signs',
                            content: location.name + ', ' + location.state,
                            onClick: (event) => this.handleClick(event, location)
                        }
                    })}
                />
            }
            <TrailSearchForm handleOnSubmit={this.handleClick} />
            {this.state.mapLoading ? 
                <BasicLoader info='Trails' />
            :
                <GoogleMap lat={this.state.selectedLocation.lat} lng={this.state.selectedLocation.lng} trails={this.state.trails} />
            }
            {/* This ternary checks to see if we have updated our trails before rendering either trail results or no trail results depending on search data */}
            {this.state.trails && this.state.trails.length > 0 ?
                <div className='table-holder'>
                    <SearchResults trails={this.state.trails} user={this.props.user} />
                </div>
            :
                this.state.selectedLocation.lat ?
                    <div className='table-holder' >
                        <p>There are no trails near {this.state.selectedLocation.lat + ' latitude'} {this.state.selectedLocation.lng + ' longitude'}</p>
                    </div>
                :
                    null
            }
            <Button className='search-back-button' color='brown' icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </div>
    }
}

const mapStateToProps = state => {
    return {user: state.user.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);