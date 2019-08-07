import { api } from '../services/api'
export default function manageUser(state = {
    user: {}
}, action) {
    switch (action.type) {
        case 'SIGNUP':
            let user = { username: action.user.username, password: action.user.password }
             api.auth.signup({user: user}).then(json => {
                 localStorage.setItem('token', json.jwt)
                 user = json.user
                })
            return {...state, user: user}
        case 'LOGIN':
            let returningUser = { username: action.user.username, password: action.user.password }
            api.auth.login({user: returningUser}).then(json => {
                localStorage.setItem('token', json.jwt)
                returningUser = json.user
            })
            return {...state, user: returningUser}
        case 'AUTHENTICATE':
            let authenticatedUser = {}
            api.auth.getCurrentUser().then(json => authenticatedUser = json.user)
            return {...state, user: authenticatedUser}
        default:
            return state
    }
}