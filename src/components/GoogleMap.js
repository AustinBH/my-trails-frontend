import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { GOOGLE_MAPS_API_KEY } from '../services/API_KEY';

const mapStyles = {
    width: '90%',
    height: '90%',
    margin: 'auto'
}

class GoogleMap extends Component {

    state= {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    displayTrails = () => {
        return this.props.trails.map((trail, idx) => {
            return <Marker
                key={idx}
                name={trail.name}
                position={{
                    lat: trail.latitude,
                    lng: trail.longitude
                }}
                onClick={this.onMarkerClick}
            />
        })
    }

    render() {
        if (this.props.lat) {
            return (
                    <Map
                        className='map-holder'
                        google={this.props.google}
                        onClick={this.onMapClicked}
                        zoom={9}
                        style={mapStyles}
                        initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
                    >
                        <Marker name='Current Location' onClick={this.onMarkerClick} position={{ lat: this.props.lat, lng: this.props.lng}} />
                        {this.displayTrails()}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}>
                            <div>
                                <p>{this.state.selectedPlace.name}</p>
                            </div>
                        </InfoWindow>
                    </Map>
            )} else {
            return null
        }
        
    }
}

export default GoogleApiWrapper({apiKey: GOOGLE_MAPS_API_KEY})(GoogleMap);