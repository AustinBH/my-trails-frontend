import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import FavButton from '../components/buttons/FavButton';
import CompleteButton from '../components/buttons/CompleteButton';
import InfoHolder from '../components/InfoHolder';
import CommentHolder from './CommentHolder';
import PhotosHolder from '../components/PhotosHolder';


const SearchData = props => {

    const displayComments = () => {
        window.scrollTo(0, 10000)
        if (!props.comments.hidden) {
            const trail = props.trails.find(trail => trail.id === props.comments.id)
            return <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell content='Comments' />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell><CommentHolder trail={trail} /></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        }
    }
    const displayInfo = () => {
        window.scrollTo(0, 10000)
        if (!props.info.hidden) {
            const trail = props.trails.find(trail => trail.id === props.info.id)
            return <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell content={trail.name} />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell><InfoHolder trail={trail} /></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        }
    }
    const displayPhotos = () => {
        window.scrollTo(0, 10000)
        if (!props.photo.hidden) {
            const trail = props.trails.find(trail => trail.id === props.photo.id)
            return <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell content='Photos' />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell><PhotosHolder trail={trail} /></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        }
    }

    return props.trails && props.trails.length > 0 ?
        <>
        <Table striped className='search-table'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell content='Name'/>
                    <Table.HeaderCell content='Length'/>
                    <Table.HeaderCell content='Condition'/>
                    <Table.HeaderCell/>
                    <Table.HeaderCell/>
                    <Table.HeaderCell/>
                    <Table.HeaderCell/>
                    <Table.HeaderCell/>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.trails.map(trail => {
                    return <Table.Row key={trail.id}>
                        <Table.Cell content={trail.name}/>
                        <Table.Cell content={trail.length + 'miles'}/>
                        <Table.Cell content={trail.conditionStatus}/>
                        <Table.Cell><FavButton user={props.user} trail={trail} handleOnClick={props.handleClick} /></Table.Cell>
                        <Table.Cell><CompleteButton user={props.user} trail={trail} handleOnClick={props.handleClick} /></Table.Cell>
                        <Table.Cell><Button color='blue' name='comments' icon='comment alternate' content='Comments' onClick={(event) => props.handleClick(event, trail)} /></Table.Cell>
                        <Table.Cell><Button color='blue' name='info' icon='info circle' content='More Info' onClick={(event) => props.handleClick(event, trail)} /></Table.Cell>
                        <Table.Cell><Button color='blue' name='photos' icon='photo' content='Photos' onClick={(event) => props.handleClick(event, trail)} /></Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
        {displayComments()}
        {displayInfo()}
        {displayPhotos()}
        </>
        :
        null
}

export default SearchData;