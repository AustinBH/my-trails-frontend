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

const edit = data => {
    return fetch(`${API_ROOT}/account`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const getLocations = () => {
    return fetch(`${API_ROOT}/locations`, {
        headers: headers()
    }).then(res => res.json())
}

const getCommentsByTrail = (trailId) => {
    return fetch(`${API_ROOT}/comments?trail_id=${trailId}`, {
        headers: headers()
    }).then(res => res.json())
}

const addComment = (data) => {
    return fetch (`${API_ROOT}/comments`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const editComment = (data) => {
    return fetch (`${API_ROOT}/comments`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const deleteComment = (data) => {
    return fetch (`${API_ROOT}/comments`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const getTrailsByLocation = (lat, long, distance, results) => {
    return fetch(`${API_ROOT}/trails-by-location?lat=${lat}&lon=${long}&distance=${distance}&results=${results}`)
    .then(res => res.json())
}

const getTrailsById = (data) => {
    let path = `${API_ROOT}/trails-by-ids?ids=${data.join(',')}`
    return fetch(path, {
        headers: headers()
    }).then(res => res.json())
}

const addFavorite = (data) => {
    return fetch (`${API_ROOT}/likes`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const deleteFavorite = (data) => {
    return fetch(`${API_ROOT}/likes`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const addCompletedHike = (data) => {
    return fetch (`${API_ROOT}/completed-hikes`,{
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const deleteCompletedHike = (data) => {
    return fetch(`${API_ROOT}/completed-hikes`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export const api = {
    auth: {
        login,
        signup,
        getCurrentUser,
        edit
    },
    comments: {
        getCommentsByTrail,
        addComment,
        editComment,
        deleteComment
    },
    favorites: {
        addFavorite,
        deleteFavorite
    },
    completedHikes: {
        addCompletedHike,
        deleteCompletedHike
    },
    locations: {
        getLocations
    },
    trails: {
        getTrailsByLocation,
        getTrailsById
    }
}