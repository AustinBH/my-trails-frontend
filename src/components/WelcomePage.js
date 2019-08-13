import React, { useState, useEffect } from 'react'
import { Button, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/userActions';
import SearchResults from '../containers/SearchResults';
import GoogleMap from '../components/GoogleMap';
import { api } from '../services/api';


const WelcomePage = props => {

    // Here we are using hooks to imitate state because this is a functional component
    const [trails, setTrails] = useState([])
    const [loading, setLoading] = useState(false)
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')

    // This function will reset our lat/long if they exist and then use the geolocation feature to update the lat/long with a user's geolocation data
    const getLocation = () => {
        props.fetchAuthentication()
        if (lat && long) {
            setTrails([])
            setLat('')
            setLong('')
        } else {
            setLoading(true)
            navigator.geolocation ? navigator.geolocation.getCurrentPosition(logPostition) : alert('Geolocation not supported')
        }
    }

    // This function sets the state of lat/long with data from the geolocation feature
    const logPostition = (position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
    }

    // This function will perform a fetch once the lat/long have been updated or when the props get updated
    // useEffect is similar to a componentdidmount/update and allows us to perform actions based on the state updating
    useEffect(() => {
        if (lat && long) {
            let distance = props.user.distance
            let results = props.user.results
            api.trails.getTrailsByLocation(lat, long, distance, results).then(json => setTrails(json)).then(setLoading(false))
        }
    }, [lat, long, props])

    return (
        <>
            <h1>My Trails</h1>
            <img className='home-image' src='https://images.freeimages.com/images/large-previews/c27/mount-rainier-1337100.jpg' alt='mount-rainier' />
            <Button className='search-back-button' onClick={getLocation} color='brown' content='Hikes Near Me!' />
            {loading ? 
                <div className='info-holder'>
                    <Segment className='info-loader'>
                        <Dimmer active>
                            <Loader>Getting Hikes...</Loader>
                        </Dimmer>
                    </Segment>
                </div> 
            :   
            trails.length > 0 ?
                <>
                <GoogleMap lat={lat} lng={long} trails={trails} />
                <div className='table-holder'>
                    <SearchResults trails={trails} user={props.user} />
                </div>
                </>
            :
                null
            }
        </>
    )
}

const mapStateToProps = state => {
    return {user: state.user.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);