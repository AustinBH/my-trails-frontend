import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import GoogleMap from './GoogleMap'
import { api } from '../services/api';
import SearchResults from '../containers/SearchResults';

class Search extends Component {

    state = {
        locations: [],
        trails: [],
        selectedLocation: {
            lat: '',
            lng: ''
        }
    }

    componentDidMount() {
        api.locations.getLocations().then(json => this.setState({locations: json}))
    }

    handleClick = (ev, location) => {
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
            this.setState({ trails: [], selectedLocation: {
                lat: '',
                lng: ''
            } })
        }
    }

    render() {
        return <div>
            <h1>Search</h1>
            <div>
                <Button.Group vertical>
                    {this.state.locations.map(location => {
                    return <Button color='brown'
                        key={location.id}
                        id={location.id}
                        icon='map signs'
                        onClick={(event) => this.handleClick(event, location)}
                        content={location.name}/>
                    })}
                </Button.Group>
            </div>
            <GoogleMap lat={this.state.selectedLocation.lat} lng={this.state.selectedLocation.lng} trails={this.state.trails} />
            {this.state.trails && this.state.trails.length > 0 ?
                <div className='table-holder'>
                    <SearchResults trails={this.state.trails} />
                </div>
            :
                null
            }
            <Button color='teal' icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </div>
    }
}

export default Search;