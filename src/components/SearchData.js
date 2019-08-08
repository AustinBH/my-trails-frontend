import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import FavButton from '../components/FavButton';
import CompleteButton from '../components/CompleteButton';


const SearchData = props => {
    if (props.trails && props.trails.length > 0) {
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
            {props.trails.map(trail => {
                return <Table.Row key={trail.id}>
                    <Table.Cell>{trail.name}</Table.Cell>
                    <Table.Cell>{trail.summary}</Table.Cell>
                    <Table.Cell>{trail.length} miles</Table.Cell>
                    <Table.Cell>{trail.ascent} ft</Table.Cell>
                    <Table.Cell>{trail.conditionStatus}</Table.Cell>
                    <Table.Cell><FavButton user={props.user} trail={trail} handleOnClick={props.handleClick} /></Table.Cell>
                    <Table.Cell><CompleteButton user={props.user} trail={trail} handleOnClick={props.handleClick} /></Table.Cell>
                    <Table.Cell><Button name='comments' icon='comment alternate' content='Comments' onClick={(event) => props.handleClick(event, trail)} /></Table.Cell>
                    <Table.Cell><Button name='info' icon='info circle' content='More Info' onClick={(event) => props.handleClick(event, trail)} /></Table.Cell>
                </Table.Row>
            })}
        </Table.Body>
    </Table>
    } else {
        return null
    }
}

export default SearchData;