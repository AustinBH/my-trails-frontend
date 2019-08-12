import React, { Component } from 'react';
import { Button, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { api } from '../services/api';
import { fetchAuthentication } from '../actions/userActions';
import GoogleMap from './GoogleMap'
import SearchResults from '../containers/SearchResults';
import TrailSearchForm from './TrailSearchForm';


class Search extends Component {

    state = {
        locations: [],
        trails: [],
        selectedLocation: {
            lat: '',
            lng: ''
        },
        isLoading: true
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
            }
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
            }
        }))
    }

    render() {
        return <div>
            <h1>Search</h1>
            {/* Adding a ternary to display a loading indicator when fetching locations */}
            {this.state.isLoading ? 
                <div className='info-holder'>
                    <Segment className='info-loader'>
                        <Dimmer active>
                            <Loader>Getting Locations...</Loader>
                        </Dimmer>
                    </Segment>
                </div> 
            :
                <Button.Group vertical>
                    {this.state.locations.map(location => {
                        return <Button color='brown'
                            loading={this.state.isLoading}
                            key={location.id}
                            id={location.id}
                            icon='map signs'
                            onClick={(event) => this.handleClick(event, location)}
                            content={location.name} />
                    })}
                </Button.Group>
            }
            
            <TrailSearchForm handleOnSubmit={this.handleClick} />
            <GoogleMap lat={this.state.selectedLocation.lat} lng={this.state.selectedLocation.lng} trails={this.state.trails} />
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
    return {user: state.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);