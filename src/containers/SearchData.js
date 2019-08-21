import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import FavButton from '../components/buttons/FavButton';
import CompleteButton from '../components/buttons/CompleteButton';
import InfoHolder from '../components/InfoHolder';
import CommentHolder from './CommentHolder';
import PhotosHolder from '../components/PhotosHolder';


const SearchData = props => {

    const displayMore = () => {
        let component = null
        let trail = ''
        let name = ''
        if (!props.comments.hidden) {
            trail = props.trails.find(trail => trail.id === props.comments.id)
            component = <CommentHolder trail={trail} />
            name = 'Comments'
        } else if (!props.info.hidden) {
            trail = props.trails.find(trail => trail.id === props.info.id)
            component = <InfoHolder trail={trail} />
            name = 'More Info'
        } else if (!props.photo.hidden) {
            trail = props.trails.find(trail => trail.id === props.photo.id)
            component = <PhotosHolder trail={trail} />
            name = 'Photos'
        } else {
            return <div className='trail-holder'/>
        }
        return <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell content={name} />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>{component}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
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
                        <Table.Cell>
                            <Button animated='fade' color='blue' name='comments' onClick={(event) => props.handleClick(event, trail)} >
                                <Button.Content visible icon='comment alternate'>
                                    <Icon name='comment alternate' />
                                    Comments
                                </Button.Content>
                                <Button.Content hidden>Comments</Button.Content>
                            </Button>
                            </Table.Cell>
                        <Table.Cell>
                            <Button animated='fade' color='blue' name='info' onClick={(event) => props.handleClick(event, trail)} >
                                <Button.Content visible>
                                    <Icon name='info circle' />
                                    Info
                                </Button.Content>
                                <Button.Content hidden>More Info</Button.Content>
                            </Button>
                        </Table.Cell>
                        <Table.Cell>
                            <Button animated='fade' color='blue' name='photos' onClick={(event) => props.handleClick(event, trail)} >
                                <Button.Content visible>
                                    <Icon name='photo' />
                                </Button.Content>
                                <Button.Content hidden>Photos</Button.Content>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
        {displayMore()}
        </>
        :
        null
}

export default SearchData;