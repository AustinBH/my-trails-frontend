import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { api } from '../services/api';
import SearchResults from './SearchResults';

class Search extends Component {

    state = {
        locations: [],
        trails: []
    }

    componentDidMount() {
        api.locations.getLocations().then(json => this.setState({locations: json}))
    }

    handleClick = (ev, location) => {
        if (this.state.trails.length === 0) {
            let lat = location.latitude
            let lon = location.longitude
            api.trails.getTrailsByLocation(lat, lon).then(json => this.setState({ trails: json }))
        } else {
            this.setState({ trails: [] })
        }
    }

    render() {
        return <div>
            <h1>Search</h1>
            <div>
                <Button.Group vertical>
                    {this.state.locations.map(location => {
                    return <Button color='brown'
                        key={location.id}
                        id={location.id}
                        icon='map signs'
                        onClick={(event) => this.handleClick(event, location)}
                        content={location.name}/>
                    })}
                </Button.Group>
            </div>
            <SearchResults trails={this.state.trails} />
            <Button color='teal'icon='backward'onClick={() => this.props.history.push('/')} content='Go Back'/>
        </div>
    }
}

export default Search;