import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import User from './containers/UserContainer'
import Home from './containers/HomeContainer'

class App extends Component {

  render() {
    return (
      <div className="App">
        {localStorage.getItem('token') ?
          <Home />
          :
          <User />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(App);
