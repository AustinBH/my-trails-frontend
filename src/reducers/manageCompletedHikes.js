const initialState = []

const manageCompletedHikes = (state = initialState, action) => {
    let completedHikes = action.payload
    switch (action.type) {
        case 'GETCOMPLETEDHIKES':
            return completedHikes
        case 'DELETECOMPLETEDHIKES':
            return initialState
        default:
            return state
    }
}

export default manageCompletedHikes