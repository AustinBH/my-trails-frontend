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

// This is the setup for our redux store, the compose enhancers function is used to allow redux dev tools if applicable but not break the app otherwise
const rootReducer = combineReducers({user: manageUser, avatars: manageAvatars, favorites: manageFavorites, completedHikes: manageCompletedHikes})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(rootReducer, enhancer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));
