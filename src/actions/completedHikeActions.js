import { api } from '../services/api';

export const getCompletedHikesByTrail = (completedHikes) => {
    return {
        type: 'GETCOMPLETEDHIKES',
        payload: completedHikes
    }
}

export const fetchCompletedHikes = trail => {
    return (dispatch) => {
        return api.completedHikes.getCompletedHikesByTrail(trail).then(json => dispatch(getCompletedHikesByTrail(json)))
    }
}