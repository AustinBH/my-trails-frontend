const API_ROOT = 'https://my-trails-backend.herokuapp.com/api/v1'

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
        method: 'GET',
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

const deleteAccount = data => {
    return fetch(`${API_ROOT}/account`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}

const getAvatars = () => {
    return fetch(`${API_ROOT}/avatars`, {
        method: 'GET',
        headers: headers()
    }).then(res => res.json())
}

const getLocations = () => {
    return fetch(`${API_ROOT}/locations`, {
        method: 'GET',
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
    return fetch(`${API_ROOT}/trails-by-location?lat=${lat}&lon=${long}&distance=${distance}&results=${results}`, {
        method: 'GET',
        headers: headers()
    })
    .then(res => res.json())
}

const getTrailsById = (data) => {
    let path = `${API_ROOT}/trails-by-ids?ids=${data.join(',')}`
    return fetch(path, {
        method: 'GET',
        headers: headers()
    }).then(res => res.json())
}

const getFavoritesByTrail = (data) => {
    return fetch(`${API_ROOT}/likes?trail_id=${data}`, {
        method: 'GET',
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

const getCompletedHikesByTrail = (data) => {
    return fetch(`${API_ROOT}/completed-hikes?trail_id=${data}`, {
        method: 'GET',
        headers: headers()
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

const getPhotosByTrail = (data) => {
    return fetch(`${API_ROOT}/images?trail_id=${data}`, {
        method: 'GET',
        headers: headers()
    }).then(res => res.json())
}

const addPhoto = (data) => {
    return fetch(`${API_ROOT}/images`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(res => res.json())
}
const deletePhoto = (data) => {
    return fetch(`${API_ROOT}/images`, {
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
        edit,
        deleteAccount
    },
    avatars: {
        getAvatars
    },
    comments: {
        getCommentsByTrail,
        addComment,
        editComment,
        deleteComment
    },
    completedHikes: {
        getCompletedHikesByTrail,
        addCompletedHike,
        deleteCompletedHike
    },
    favorites: {
        getFavoritesByTrail,
        addFavorite,
        deleteFavorite
    },
    photos: {
        getPhotosByTrail,
        addPhoto,
        deletePhoto
    },
    locations: {
        getLocations
    },
    trails: {
        getTrailsByLocation,
        getTrailsById
    }
}