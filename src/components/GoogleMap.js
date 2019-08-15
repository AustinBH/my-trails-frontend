import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

class GoogleMap extends Component {
    static defaultProps = {
        lat: 47.6062,
        lng: -122.3321
    }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    // This function opens an info window when a user clicks on a map marker
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    // This function allows a user to click on the map and collapse their info window
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    // This function maps over the trails for this map and returns markers to indicate each trail
    displayTrails = () => {
        return this.props.trails.map((trail, idx) => {
            return <MapMarker
                key={idx}
                trail={trail}
                lat={trail.latitude}
                lng={trail.longitude}
            />
        })
    }

    render() {
        if (this.props.lat) {
            return (
                    <>
                    <h1>Map</h1>
                    <div style={{
                        margin: 'auto',
                        height: '90vh',
                        width: '90%',
                        zIndex: '1'
                    }}>
                        <GoogleMapReact
                            className='map-holder'
                            bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                            defaultZoom={9}
                            defaultCenter={{ lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng) }}
                        >
                            <MapMarker lat={this.props.lat} lng={this.props.lng} trail={{name: 'Selected Location'}} show={false} current />
                            {this.displayTrails()}
                        </GoogleMapReact>
                    </div>
                    </>
            )} else {
            return null
        }
        
    }
}

export default GoogleMap;