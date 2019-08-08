import React, { Component} from 'react';
import { Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/userActions';
import { api } from '../services/api';

class SearchResults extends Component {

    componentDidMount() {
        this.props.fetchAuthentication()
    }

    displayFavButton = (trail) => {
        let button = <Button name='fav' icon='star outline' content='Fav' onClick={(event) => this.handleClick(event, trail)} />
        for(let like of this.props.user.likes) {
            if (like.trail_id === trail.id)
                button = <Button color='orange' name='fav' icon='star outline' content='Fav' onClick={(event) => this.handleClick(event, trail)} />
        }
        return button   
    }

    displayCompletedButton = (trail) => {
        let button = <Button name='complete' icon='check circle outline' content='Complete' onClick={(event) => this.handleClick(event, trail)} />
        for (let completed of this.props.user.completed_hikes) {
            if (completed.trail_id === trail.id)
                button = <Button color='green' name='complete' icon='check circle outline' content='Complete' onClick={(event) => this.handleClick(event, trail)} />
        }
        return button
    }

    handleClick = (ev, data) => {
        let button = ev.target

        switch (button.name) {
            case 'fav':
                let favorite = {trail_id: data.id, user_id: this.props.user.id}
                if (!button.className.includes('orange')) {
                    api.favorites.addFavorite({ like: favorite }).then(json => {button.className = 'ui orange button'})
                } else {
                    api.favorites.deleteFavorite({ like: favorite}).then(json => {button.className = 'ui button'})
                }
                return this.props.fetchAuthentication()
            case 'complete':
                let complete = {trail_id: data.id, user_id: this.props.user.id}
                if (!button.className.includes('green')) {
                    api.completedHikes.addCompletedHike({ completed_hike: complete }).then(json => { button.className = 'ui green button' })
                } else {
                    api.completedHikes.deleteCompletedHike({ completed_hike: complete}).then(json => { button.className = 'ui button'})
                }
                return this.props.fetchAuthentication()
            case 'comments':
                return this.props.fetchAuthentication()
            case 'info':
                return this.props.fetchAuthentication()
            default:
                return null
        }
    }
 
    render() {
        if (this.props.trails && this.props.trails.length > 0) {
            return <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Summary</Table.HeaderCell>
                        <Table.HeaderCell>length</Table.HeaderCell>
                        <Table.HeaderCell>Ascent</Table.HeaderCell>
                        <Table.HeaderCell>Condition</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.trails.map(trail => {
                        return <Table.Row key={trail.id}>
                            <Table.Cell>{trail.name}</Table.Cell>
                            <Table.Cell>{trail.summary}</Table.Cell>
                            <Table.Cell>{trail.length} miles</Table.Cell>
                            <Table.Cell>{trail.ascent} ft</Table.Cell>
                            <Table.Cell>{trail.conditionStatus}</Table.Cell>
                            <Table.Cell>{this.displayFavButton(trail)}</Table.Cell>
                            <Table.Cell>{this.displayCompletedButton(trail)}</Table.Cell>
                            <Table.Cell><Button name='comments' icon='comment alternate' content='Comments' onClick={(event) => this.handleClick(event, trail)} /></Table.Cell>
                            <Table.Cell><Button name='info' icon='info circle' content='More Info' onClick={(event) => this.handleClick(event, trail)} /></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        }
        return null
    }
}

const mapStateToProps = state => {
    return {user: state.user}
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);