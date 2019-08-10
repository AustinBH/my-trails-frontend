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

    handleClick = (ev, data) => {
        if (buttonSwitcher(ev, data, this.props) && buttonSwitcher(ev, data, this.props)[0] === 'info') {
            this.setState({info: {
                id: buttonSwitcher(ev, data, this.props)[1],
                hidden: !this.state.info.hidden
            }})
        } else if (buttonSwitcher(ev, data, this.props) && buttonSwitcher(ev, data, this.props)[0] === 'comment') {
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

export default SearchResults;