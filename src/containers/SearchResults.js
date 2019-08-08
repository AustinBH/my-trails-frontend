import React, { Component} from 'react';
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/userActions';
import { buttonSwitcher } from '../services/buttonSwitcher';
import SearchData from '../components/SearchData';


class SearchResults extends Component {

    state = {
        hidden: {
            id: '',
            status: true
        }
    }

    componentDidMount() {
        this.props.fetchAuthentication()
    }

    handleClick = (ev, data) => {
        if (typeof buttonSwitcher(ev, data, this.props) === 'number') {
            this.setState({hidden: {
                id: buttonSwitcher(ev, data, this.props),
                status: !this.state.hidden.status
            }})
        } 
        buttonSwitcher(ev, data, this.props)
    }
 
    render() {
        return <SearchData hidden={this.state.hidden} trails={this.props.trails} handleClick={this.handleClick} user={this.props.user} />
    }
}

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);