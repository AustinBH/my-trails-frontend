import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import Account from '../components/Account.js';
import Favorites from '../components/Favorites';
import Hikes from '../components/Hikes';
import Search from '../components/Search';

class HomeContainer extends Component {

    componentDidMount() {
        this.props.authenticate()
    }

    render() {
        return <div>
            
            <Router>
                <Menu>
                    <Menu.Item header as={NavLink} exact to='/account' activeClassName='active'>Account</Menu.Item>
                    <Menu.Item header as={NavLink} exact to='/favorites' activeClassName='active'>Favorites</Menu.Item>
                    <Menu.Item header as={NavLink} exact to='/hikes' activeClassName='active'>Find Hikes</Menu.Item>
                    <Menu.Item header as={NavLink} exact to='/search' activeClassName='active'>Search</Menu.Item>
                </Menu>
                <Route path='/account' exact render={props => <Account {...props} />}/>
                <Route path='/favorites' exact render={props => <Favorites {...props} />} />
                <Route path='/hikes' exact render={props => <Hikes {...props} />}/>
                <Route path='/search' exact render={props => <Search {...props} />}/>
            </Router>
        </div>
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => ({
    authenticate: () => dispatch({ type: 'AUTHENTICATE' })
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);