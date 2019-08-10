import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { fetchSignup } from '../actions/userActions';
import { fetchLogin } from '../actions/userActions';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

class UserContainer extends Component {
    state = {
        login: {
            username: '',
            password: ''
        },
        signup: {
            username: '',
            password: '',
            distance: 20,
            results: 20
        }
        
    }

    handleChange = ev => {
        this.setState({
            [ev.target.parentNode.parentNode.parentNode.name]: {
                ...this.state[ev.target.parentNode.parentNode.parentNode.name], [ev.target.name]: ev.target.value
            }
        })
    }

    startFetch = (str) => {
        str === 'login' ?
        this.props.fetchLogin(this.state.login)
        :
        this.props.fetchSignup(this.state.signup)
    }

    render() {
        return (
            <>
                <h1>Hike Amie</h1>
                <img className='home-image' src='https://images.freeimages.com/images/large-previews/c27/mount-rainier-1337100.jpg' alt='mount-rainier' />
                <Router>
                    <Route path='/login' exact render={props => <Login {...props} startFetch={this.startFetch} login={this.state.login} handleOnChange={this.handleChange}/>}/>
                    <Route path='/signup' exact render={props => <Signup {...props} startFetch={this.startFetch} signup={this.state.signup} handleOnChange={this.handleChange}/>} />
                    <Button color='brown' as={NavLink} content='Login' exact to='/login' activeClassName='active' />
                    <Button color='brown' as={NavLink} content='Signup' exact to='/signup' activeClassName='active' />
                </Router>
            </>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    fetchLogin: (data) => dispatch(fetchLogin(data)),
    fetchSignup: (data) => dispatch(fetchSignup(data))
})

export default connect(null, mapDispatchToProps)(UserContainer);