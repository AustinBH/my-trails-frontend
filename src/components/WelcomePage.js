import React, { useState } from 'react'
import { Button, Segment, Dimmer, Loader } from 'semantic-ui-react';
import SearchResults from '../containers/SearchResults';
import GoogleMap from '../components/GoogleMap';
import { api } from '../services/api';


const WelcomePage = props => {

    const [trails, setTrails] = useState([])
    const [loading, setLoading] = useState(false)
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')

    const getLocation = () => {
        setLoading(true)
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(logPostition) : alert('Geolocation not supported')
    }

    const logPostition = (position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
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
                <>
                {trails.length > 0 ?
                    <GoogleMap lat={lat} lng={long} trails={trails} />
                :
                    null
                }
                <div className='table-holder'>
                    <SearchResults trails={trails} /> 
                </div>
                </>
            }
        </>
    )
}

export default WelcomePage;