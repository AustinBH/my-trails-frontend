import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Account from '../components/Account.js';
import Favorites from '../components/Favorites';
import Hikes from '../components/Hikes';
import Search from '../components/Search';

class HomeContainer extends Component {

    render() {
        return <Router>
            <Menu pointing fixed='top' fluid>
                <Menu.Item icon='user' header as={NavLink} exact to='/account' activeClassName='active' name='Account'/>
                <Menu.Item icon='like' header as={NavLink} exact to='/favorites' activeClassName='active' name='Favs'/>
                <Menu.Item icon='map' header as={NavLink} exact to='/hikes' activeClassName='active' name='Hikes'/>
                <Menu.Item icon='search' header as={NavLink} exact to='/search' activeClassName='active' name='Search'/>
            </Menu>
            <div className='info-holder'>
                <Route path='/account' exact render={props => <Account {...props} />} />
                <Route path='/favorites' exact render={props => <Favorites {...props} />} />
                <Route path='/hikes' exact render={props => <Hikes {...props} />} />
                <Route path='/search' exact render={props => <Search {...props} />} />
            </div>
        </Router>
    }
}

export default HomeContainer;