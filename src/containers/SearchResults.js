import React, { Component} from 'react';
import { buttonSwitcher } from '../services/buttonSwitcher';
import SearchData from './SearchData';


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

    // This function will allow users to use the comments/more info buttons that appear in search data
    handleClick = (ev, data) => {
        if (data) {
            let response = buttonSwitcher(ev, data, this.props)
            if (response && response[0] === 'info') {
                this.setState({
                    info: {
                        id: response[1],
                        hidden: !this.state.info.hidden
                    }
                })
            } else if (response && response[0] === 'comment') {
                this.setState({
                    comments: {
                        id: response[1],
                        hidden: !this.state.comments.hidden
                    }
                })
            }
        }
    }
 
    render() {
        return <>
            <h1>Trail Info</h1>
            <SearchData info={this.state.info} comments={this.state.comments} trails={this.props.trails} handleClick={this.handleClick} user={this.props.user} />
        </>
    }
}

export default SearchResults;