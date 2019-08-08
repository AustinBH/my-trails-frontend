import React, { Component} from 'react';
import { Table } from 'semantic-ui-react';

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
                            <Table.Cell>Length: {trail.length} miles</Table.Cell>
                            <Table.Cell>Ascent: {trail.ascent}</Table.Cell>
                            <Table.Cell>Condition: {trail.conditionStatus}</Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        }
        return null
    }
}

export default SearchResults