import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
import Account from '../components/Account.js';
import Favorites from '../components/Favorites';
import Trails from '../components/Trails';
import Search from '../components/Search';
import WelcomePage from '../components/WelcomePage';

class HomeContainer extends Component {

    logout = () => {
        this.props.logout()
    }

    render() {
        return <>
            <Router>
                <Menu fixed='top' fluid widths={4} pointing color='teal'>
                    <Dropdown item text='Account'>
                        <Dropdown.Menu>
                            <Dropdown.Item icon='user' as={NavLink} exact to='/account' activeClassName='active'/>
                            <Dropdown.Item icon='power off' text='Logout' onClick={this.logout}/>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item icon='like' as={NavLink} exact to='/favorites' activeClassName='active' name='Favs'/>
                    <Menu.Item icon='map' as={NavLink} exact to='/hikes' activeClassName='active' name='Trails'/>
                    <Menu.Item icon='search' as={NavLink} exact to='/search' activeClassName='active' name='Search'/>
                </Menu>
                <Route path='/' exact component={WelcomePage} />
                <Route path='/account' exact render={props => <Account {...props} />} />
                <Route path='/favorites' exact render={props => <Favorites {...props} />} />
                <Route path='/hikes' exact render={props => <Trails {...props} />} />
                <Route path='/search' exact render={props => <Search {...props} />} />
            </Router>
        </>
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: 'LOGOUT' })
})

export default connect(null, mapDispatchToProps)(HomeContainer);