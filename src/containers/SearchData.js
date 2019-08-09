import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import FavButton from '../components/FavButton';
import CompleteButton from '../components/CompleteButton';
import InfoHolder from '../components/InfoHolder';
import CommentHolder from '../components/CommentHolder';


const SearchData = props => {
    if (props.trails && props.trails.length > 0) {
    return  <Table striped className='search-table'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>length</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                {!props.comments.hidden ? <Table.HeaderCell></Table.HeaderCell> : null}
                <Table.HeaderCell></Table.HeaderCell>
                {!props.info.hidden ? <Table.HeaderCell></Table.HeaderCell> : null}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {props.trails.map(trail => {
                return <Table.Row key={trail.id}>
                    <Table.Cell>{trail.name}</Table.Cell>
                    <Table.Cell>{trail.length} miles</Table.Cell>
                    <Table.Cell>{trail.conditionStatus}</Table.Cell>
                    <Table.Cell><FavButton user={props.user} trail={trail} handleOnClick={props.handleClick} /></Table.Cell>
                    <Table.Cell><CompleteButton user={props.user} trail={trail} handleOnClick={props.handleClick} /></Table.Cell>
                    <Table.Cell><Button color='blue' name='comments' icon='comment alternate' content='Comments' onClick={(event) => props.handleClick(event, trail)} /></Table.Cell>
                    {!props.comments.hidden && props.comments.id === trail.id ? <Table.Cell><CommentHolder trail={trail} /></Table.Cell> : null}
                    <Table.Cell><Button color='blue' name='info' icon='info circle' content='More Info' onClick={(event) => props.handleClick(event, trail)} /></Table.Cell>
                    {!props.info.hidden && props.info.id === trail.id ? <Table.Cell><InfoHolder trail={trail} /></Table.Cell> : null}
                </Table.Row>
            })}
        </Table.Body>
    </Table>
    } else {
        return null
    }
}

export default SearchData;