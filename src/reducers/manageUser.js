import { api } from '../services/api'
export default function manageUser(state = {
    user: {}
}, action) {
    switch (action.type) {
        case 'SIGNUP':
            let user = { username: action.username, password: action.password }
             api.auth.signup(user).then(json => {
                 localStorage.setItem('token', json.jwt)
                 user = json.user
                })
            return {...state, user: user}
        case 'LOGIN':
            api.auth.login(user).then(json => {
                localStorage.setItem('token', json.jwt)
                user = json.user
            })
            return {...state, user: user}
        default:
            return state
    }
}