import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/userActions';
import SearchData from './SearchData';

class Favorites extends Component {
    render() {
        return <>
            <h1>Favorites</h1>
            <SearchData trails={this.props.trails} user={this.props.user} />
            <Button color='teal' icon='backward' onClick={() => this.props.history.push('/')} content='Go Back' />
        </>
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);