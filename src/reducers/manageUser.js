const initialState = {user: {}}

const manageUser = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP':
            return {...state, user: action.payload }
        case 'LOGIN':
            return {...state, user: action.payload }
        case 'AUTHENTICATE':
            return {...state, user: action.payload }
        case 'EDIT':
            return {...state, user: action.payload }
        case 'LOGOUT':
            localStorage.clear()
            return {...state, user: {}}
        default:
            return state
    }
}

export default manageUser