const initialState = []

const manageAvatars = (state = initialState, action) => {
    let avatars = action.payload
    switch (action.type) {
        case 'AVATARS':
            return avatars
        default:
            return state
    }
}

export default manageAvatars