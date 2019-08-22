import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import manageUser from './reducers/manageUser';
import manageAvatars from './reducers/manageAvatars';
import manageFavorites from './reducers/manageFavorites';
import manageCompletedHikes from './reducers/manageCompletedHikes';

const rootReducer = combineReducers({user: manageUser, avatars: manageAvatars, favorites: manageFavorites, completedHikes: manageCompletedHikes})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(rootReducer, enhancer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
