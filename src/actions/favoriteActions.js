import { api } from '../services/api';

export const getFavoritesByTrail = (favorites) => {
    return {
        type: 'GETFAVORITES',
        payload: favorites
    }
}

export const fetchFavorites = trail => {
    return (dispatch) => {
        return api.favorites.getFavoritesByTrail(trail).then(json => dispatch(getFavoritesByTrail(json)))
    }
}