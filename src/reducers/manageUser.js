const initialState = {}

const manageUser = (state = initialState, action) => {
    let user = action.payload
    switch (action.type) {
        case 'SIGNUP':
            return {...state, user }
        case 'LOGIN':
            return {...state, user }
        case 'AUTHENTICATE':
            return {...state, user }
        case 'EDIT':
            return {...state, user }
        case 'LOGOUT':
            localStorage.clear()
            return {...state, user: {}}
        default:
            return state
    }
}

export default manageUser