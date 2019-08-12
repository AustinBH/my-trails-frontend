import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
    width: '90%',
    height: '90%',
    margin: 'auto'
}

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

class GoogleMap extends Component {

    state= {
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
            return <Marker
                key={idx}
                title={trail.name}
                name={trail.name}
                position={{
                    lat: trail.latitude,
                    lng: trail.longitude
                }}
                onClick={this.onMarkerClick}
                icon={{
                    url: 'https://img.icons8.com/dusk/2x/filled-flag.png',
                    anchor: new this.props.google.maps.Point(32,32),
                    scaledSize: new this.props.google.maps.Size(24,24)
                }}
            />
        })
    }

    render() {
        if (this.props.lat) {
            return (
                    <>
                    <h1>Map</h1>
                    <Map
                        className='map-holder'
                        google={this.props.google}
                        onClick={this.onMapClicked}
                        zoom={9}
                        style={mapStyles}
                        initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
                    >
                    <Marker
                        name='Selected Location'
                        onClick={this.onMarkerClick}
                        position={{ lat: this.props.lat, lng: this.props.lng }}
                        icon={{
                        url: 'https://img.icons8.com/color/2x/user-location.png',
                        anchor: new this.props.google.maps.Point(32, 32),
                        scaledSize: new this.props.google.maps.Size(32, 32)}}
                    />
                    {this.displayTrails()}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <p>{this.state.selectedPlace.name}</p>
                        </div>
                    </InfoWindow>
                    </Map>
                    </>
            )} else {
            return null
        }
        
    }
}

export default GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY})(GoogleMap);