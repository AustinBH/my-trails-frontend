import React, { Component} from 'react';
import { Table, Button } from 'semantic-ui-react';

class SearchResults extends Component {
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
                            <Table.Cell><Button icon='star outline' content='Fav'/></Table.Cell>
                            <Table.Cell><Button icon='check circle outline' content='Complete' /></Table.Cell>
                            <Table.Cell><Button icon='comment alternate' content='Comments' /></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        }
        return null
    }
}

export default SearchResults