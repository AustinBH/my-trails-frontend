import { api } from '../services/api';

export const getAvatars = (avatars) => {
    return {
        type: 'AVATARS',
        payload: avatars
    }
}

export const fetchAvatars = () => {
    return (dispatch) => {
        return api.avatars.getAvatars().then(json => dispatch(getAvatars(json)))
    }
}