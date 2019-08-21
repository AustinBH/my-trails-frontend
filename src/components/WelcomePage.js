import React, { useState, useEffect } from 'react'
import { Button, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/userActions';
import SearchResults from '../containers/SearchResults';
import GoogleMap from '../components/GoogleMap';
import { api } from '../services/api';
import BasicLoader from './BasicLoader';
import SearchSettingsModal from './searchModals/SearchSettingsModal';
import ErrorModal from './auth/ErrorModal';


const WelcomePage = props => {

    // Here we are using hooks to imitate state because this is a functional component
    const [trails, setTrails] = useState([])
    const [loading, setLoading] = useState(false)
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [distance, setDistance] = useState('')
    const [results, setResults] = useState('')
    const [open, setOpen] = useState(false)
    const [warningOpen, setWarningOpen] = useState(false)
    const [error, setError] = useState('')

    // This function will reset our lat/long if they exist and then use the geolocation feature to update the lat/long with a user's geolocation data
    const getLocation = () => {
        props.fetchAuthentication()
        if (lat && long) {
            setTrails([])
            setLat('')
            setLong('')
        } else {
            setLoading(true)
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(logPostition, positionError)
            } else {
                setError('Geolocation is not supported in your browser')
                setWarningOpen(true)
                setLoading(false)
            }
        }
    }

    // This function sets the state of lat/long with data from the geolocation feature
    const logPostition = (position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
    }

    // This is our callback function to when we get an error from the geolocation API
    const positionError = () => {
        setError('Sorry, we were unable to retrieve your location')
        setWarningOpen(true)
        setLoading(false)
    }

    // These three functions all manage the search settings modal and update the hooks appropriately
    const handleChange = (ev, value )  => {
        if (value.name === 'distance') {
            setDistance(value.value)
        } else if (value.name === 'results') {
            setResults(value.value)
        }
    }

    const handleSubmit = ev => {
        ev.preventDefault()
        toggle()
    }

    const toggle = () => {
        setOpen(!open)
    }

    const toggleWarning = () => {
        setWarningOpen(!warningOpen)
    }

    // This function will perform a fetch once the lat/long have been updated or when the props get updated
    // useEffect is similar to a componentdidmount/update and allows us to perform actions based on the state updating
    useEffect(() => {
        if (lat && long && props.user) {
            let searchDistance = distance || props.user.distance
            let searchResults = results || props.user.results
            api.trails.getTrailsByLocation(lat, long, searchDistance, searchResults).then(json => setTrails(json)).then(setLoading(false))
        }
    }, [lat, long, props, distance, results])

    return <>
        <h1>My Trails</h1>
        <Image size='big' className='home-image' src='https://images.freeimages.com/images/large-previews/c27/mount-rainier-1337100.jpg' alt='mount-rainier' />
        <SearchSettingsModal open={open} toggle={toggle} range={distance} results={results} handleOnChange={handleChange} handleOnSubmit={handleSubmit} />
        <ErrorModal open={warningOpen} toggle={toggleWarning} error={error} />
        <Button className='home-button' onClick={getLocation} icon='location arrow' color='brown' content='Hikes Near Me!' />
        {loading ? 
            <BasicLoader info='Trails' /> 
        :   
        trails.length > 0 ?
            <>
                <GoogleMap lat={lat} lng={long} trails={trails} />
                <SearchResults trails={trails} user={props.user} />
            </>
        :
            null
        }
    </>
}

const mapStateToProps = state => {
    return {user: state.user.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);