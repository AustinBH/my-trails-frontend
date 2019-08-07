const API_ROOT = 'http://localhost:3000/api/v1'

const headers = () => {return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': localStorage.getItem('token')
}}

const signup = data => {
    console.log(data)
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

export const api = {
    auth: {
        login,
        signup,
        getCurrentUser
    }
}