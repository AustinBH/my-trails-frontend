import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { fetchSignup } from '../actions/userActions';
import { fetchLogin } from '../actions/userActions';
import AuthForm from '../components/auth/AuthForm';
import ErrorModal from '../components/auth/ErrorModal';
import BasicLoader from '../components/BasicLoader';

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
        },
        isLoading: false
    }

    // This function will set the state based on user input allowing us to control a form found in a child component
    handleChange = (ev, value) => {
        let action = ev.target.parentNode.parentNode.parentNode.parentNode.parentNode.name
        this.setState({
            [action]: {
                ...this.state[action], [value.name]: value.value
            }
        })
    }

    // This function will check to see which action we should perform and then either login or signup
    startFetch = (str) => {
        this.setState({isLoading: true})
        str === 'login' ?
        this.props.fetchLogin(this.state.login)
        :
        this.props.fetchSignup(this.state.signup)
    }

    toggleOpen = () => {
        this.props.clearError()
    }

    render() {
        return <>
            <h1>My Trails</h1>
            <img className='home-image' src='https://images.freeimages.com/images/large-previews/c27/mount-rainier-1337100.jpg' alt='mount-rainier' />
            {this.props.error ?
                <ErrorModal error={this.props.error} open={true} toggle={this.toggleOpen} />
            :
                null
            }
            {this.state.isLoading ? 
                <BasicLoader info='account' />
            :
                null
            }
            <div className='auth-holder'>
                <Router>
                    <Route path='/login' exact render={props => <AuthForm {...props} startFetch={this.startFetch} login={this.state.login} form='login' handleOnChange={this.handleChange} />} />
                    <Route path='/signup' exact render={props => <AuthForm {...props} startFetch={this.startFetch} signup={this.state.signup} form='signup' handleOnChange={this.handleChange} />} />
                    <Button icon='sign-in' color='brown' as={NavLink} content='Login' exact to='/login' activeClassName='active' />
                    <Button icon='user plus' color='brown' as={NavLink} content='Signup' exact to='/signup' activeClassName='active' />
                </Router>
            </div>
        </>
    }

}

const mapStateToProps = state => {
    return { error: state.user.error }
}

const mapDispatchToProps = dispatch => ({
    fetchLogin: (data) => dispatch(fetchLogin(data)),
    fetchSignup: (data) => dispatch(fetchSignup(data)),
    clearError: () => dispatch({ type: 'CLEARERROR' })
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);