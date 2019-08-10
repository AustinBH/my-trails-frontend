import React, { useState } from 'react'
import { Button, Segment, Dimmer, Loader } from 'semantic-ui-react';
import SearchResults from '../containers/SearchResults';
import { api } from '../services/api';


const WelcomePage = props => {

    const [trails, setTrails] = useState([])
    const [loading, setLoading] = useState(false)

    const getLocation = () => {
        setLoading(true)
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(logPostition) : alert('Geolocation not supported')
    }

    const logPostition = (position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude
        api.trails.getTrailsByLocation(lat, long).then(json => setTrails(json)).then(setLoading(false))
    }

    return (
        <>
            <h1>Hike Amie</h1>
            <img className='home-image' src='https://images.freeimages.com/images/large-previews/c27/mount-rainier-1337100.jpg' alt='mount-rainier' />
            <Button onClick={getLocation} color='brown' content='Hikes Near Me!' />
            {loading ? 
                <div className='info-holder'>
                    <Segment className='info-loader'>
                        <Dimmer active>
                            <Loader>Getting Hikes...</Loader>
                        </Dimmer>
                    </Segment>
                </div> 
            :
                <div className='user-search-holder'>
                    <SearchResults trails={trails} /> 
                </div>
            }
        </>
    )
}

export default WelcomePage;