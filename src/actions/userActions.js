import { api } from '../services/api';

export const authenticateUser = (user) => {
    return {
        type: 'AUTHENTICATE',
        payload: user
    }
}

export const fetchAuthentication = () => {
    return (dispatch) => {
        return api.auth.getCurrentUser().then(json => dispatch(authenticateUser(json.user)))
    }
    
}

export const loginUser = info => {
    if (!info.message) {
        localStorage.setItem('token', info.jwt)
        return {
            type: 'LOGIN',
            payload: info.user
        }
    } else {
        return {
            type: 'ERROR',
            payload: info.message
        }
    }
}

export const fetchLogin = (userInfo) => {
    return (dispatch) => {
        return api.auth.login({ user: userInfo }).then(json => {
            return dispatch(loginUser(json))
        })
    }
}

export const signupUser = info => {
    localStorage.setItem('token', info.jwt)
    return {
        type: 'SIGNUP',
        payload: info.user
    }
}

export const fetchSignup = (userInfo) => {
    return (dispatch) => {
       return api.auth.signup({ user: userInfo }).then(json => {
            return dispatch(signupUser(json))
        })
    }
}

export const editAccount = user => {
    return {
        type: 'EDIT',
        payload: user
    }
}

export const fetchEdit = userInfo => {
    return (dispatch) => {
        return api.auth.edit({ user: userInfo }).then(json => {
            return dispatch(editAccount(json))
        })
    }
}