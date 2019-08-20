const initialState = []

const manageFavorites = (state = initialState, action) => {
    let favorites = action.payload
    switch (action.type) {
        case 'GETFAVORITES':
            return favorites
        case 'DELETEFAVORITES':
            return initialState
        default:
            return state
    }
}

export default manageFavorites