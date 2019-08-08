const API_ROOT = 'http://localhost:3000/api/v1'

const headers = () => {return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('token')
}}

const signup = data => {
    return fetch(`${API_ROOT}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const login = data => {
    return fetch(`${API_ROOT}/login`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/account`, {
        headers: headers()
    }).then(res => res.json())
}

const getLocations = () => {
    return fetch(`${API_ROOT}/locations`, {
        headers: headers()
    }).then(res => res.json())
}

const getTrailsByLocation = (lat, long) => {
    return fetch(`${API_ROOT}/trails-by-location?lat=${lat}&lon=${long}`)
    .then(res => res.json())
}

export const api = {
    auth: {
        login,
        signup,
        getCurrentUser
    },
    locations: {
        getLocations
    },
    trails: {
        getTrailsByLocation
    }
}