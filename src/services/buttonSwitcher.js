import { api } from './api';

export const buttonSwitcher = (ev, data, props) => {
    let button = ''
    if (ev.target.name) {
        button = ev.target
    } else {
        button = ev.target.parentNode
    }
    switch (button.name) {
        case 'fav':
            let favorite = { trail_id: data.id, user_id: props.user.id }
            if (!button.className.includes('orange')) {
                api.favorites.addFavorite({ like: favorite }).then(json => {
                    if (json) {
                        button.className = 'ui orange button'
                        button.children[0].className='star icon'
                    }
                })
            } else {
                api.favorites.deleteFavorite({ like: favorite }).then(json => {
                    if (json) {
                        button.className = 'ui button'
                        button.children[0].className = 'star outline icon'
                    }
                })
            }
            return ['like', data.id]
        case 'complete':
            let complete = { trail_id: data.id, user_id: props.user.id }
            if (!button.className.includes('green')) {
                api.completedHikes.addCompletedHike({ completed_hike: complete }).then(json => {
                    if (!json.error) {
                        button.className = 'ui green button'
                        button.children[0].className = 'check circle icon'
                    }
                })
            } else {
                api.completedHikes.deleteCompletedHike({ completed_hike: complete }).then(json => {
                    if (!json.error) {
                        button.className = 'ui button'
                        button.children[0].className = 'check circle outline icon'
                    }
                })
            }
            return ['complete', data.id]
        case 'comments':
            return ['comment', data.id]
        case 'info':
            return ['info', data.id]
        default:
            return null
    }
}