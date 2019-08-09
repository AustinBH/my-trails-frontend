import React, { Component} from 'react';
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/userActions';
import { buttonSwitcher } from '../services/buttonSwitcher';
import SearchData from '../components/SearchData';


class SearchResults extends Component {

    state = {
        info: {
            id: '',
            hidden: true
        },
        comments: {
            id: '',
            hidden: true
        }
    }

    componentDidMount() {
        this.props.fetchAuthentication()
    }

    handleClick = (ev, data) => {
        if (buttonSwitcher(ev, data, this.props)[0] === 'info') {
            this.setState({info: {
                id: buttonSwitcher(ev, data, this.props)[1],
                hidden: !this.state.info.hidden
            }})
        } else if (buttonSwitcher(ev, data, this.props)[0] === 'comment') {
            this.setState({
                comments: {
                    id: buttonSwitcher(ev, data, this.props)[1],
                    hidden: !this.state.comments.hidden
                }
            })
        }
        buttonSwitcher(ev, data, this.props)
    }
 
    render() {
        return <SearchData info={this.state.info} comments={this.state.comments} trails={this.props.trails} handleClick={this.handleClick} user={this.props.user} />
    }
}

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);