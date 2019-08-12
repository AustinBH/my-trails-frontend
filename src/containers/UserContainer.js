import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { fetchSignup } from '../actions/userActions';
import { fetchLogin } from '../actions/userActions';
import AuthForm from '../components/auth/AuthForm';

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

    // This function will set the state based on user input allowing us to control a form found in a child component
    handleChange = ev => {
        this.setState({
            [ev.target.parentNode.parentNode.parentNode.name]: {
                ...this.state[ev.target.parentNode.parentNode.parentNode.name], [ev.target.name]: ev.target.value
            }
        })
    }

    // This function will check to see which action we should perform and then either login or signup
    startFetch = (str) => {
        str === 'login' ?
        this.props.fetchLogin(this.state.login)
        :
        this.props.fetchSignup(this.state.signup)
    }

    render() {
        return (
            <>
                <h1>My Trails</h1>
                <img className='home-image' src='https://images.freeimages.com/images/large-previews/c27/mount-rainier-1337100.jpg' alt='mount-rainier' />
                <div className='auth-holder'>
                    <Router>
                        <Route path='/login' exact render={props => <AuthForm {...props} startFetch={this.startFetch} login={this.state.login} form='login' handleOnChange={this.handleChange} />} />
                        <Route path='/signup' exact render={props => <AuthForm {...props} startFetch={this.startFetch} signup={this.state.signup} form='signup' handleOnChange={this.handleChange} />} />
                        <Button color='brown' as={NavLink} content='Login' exact to='/login' activeClassName='active' />
                        <Button color='brown' as={NavLink} content='Signup' exact to='/signup' activeClassName='active' />
                    </Router>
                </div>
                
            </>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    fetchLogin: (data) => dispatch(fetchLogin(data)),
    fetchSignup: (data) => dispatch(fetchSignup(data))
})

export default connect(null, mapDispatchToProps)(UserContainer);