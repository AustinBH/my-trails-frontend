import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
import Account from '../components/Account';
import Favorites from '../components/Favorites';
import Trails from '../components/Trails';
import Search from '../components/Search';
import WelcomePage from '../components/WelcomePage';

const HomeContainer = props => {

    // This function will send an action to the redux store which will remove our user information
    const logout = () => {
        props.logout()
    }

    // These options are for the dropdown menu in the navmenu
    const options = [
        <Dropdown.Item key='1' icon='settings' as={NavLink} exact to='/account' activeClassName='active' text='Edit'/>,
        <Dropdown.Item key='2' icon='sign out alternate' text='Logout' onClick={logout}/>
    ]
    
    return <Router>
        <Menu fixed='top' fluid widths={4} pointing color='teal'>
            <Dropdown text='Account' item direction='left' options={options} />
            <Menu.Item icon='like' as={NavLink} exact to='/favorites' activeClassName='active' name='Favs' />
            <Menu.Item icon='map' as={NavLink} exact to='/hikes' activeClassName='active' name='Trails' />
            <Menu.Item icon='search' as={NavLink} exact to='/search' activeClassName='active' name='Search' />
        </Menu>
        <Route path='/' exact component={WelcomePage} />
        <Route path='/account' exact render={props => <Account {...props} />} />
        <Route path='/favorites' exact render={props => <Favorites {...props} />} />
        <Route path='/hikes' exact render={props => <Trails {...props} />} />
        <Route path='/search' exact render={props => <Search {...props} />} />
    </Router>
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: 'LOGOUT' })
})

export default connect(null, mapDispatchToProps)(HomeContainer);