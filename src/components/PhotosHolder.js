import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import { fetchAuthentication } from '../actions/userActions';
import { api } from '../services/api';
import BasicLoader from '../components/BasicLoader';
import AddPhotoModal from './photoModals/AddPhotoModal';
import DeletePhotoModal from './photoModals/DeletePhotoModal';

class PhotosHolder extends Component {

    state = {
        isLoading: false,
        photos: [],
        open: false,
        deleteOpen: false,
        deletingId: '',
        photo: {}
    }

    componentDidMount() {
        this.props.fetchAuthentication()
        this.fetchTrailPhotos()
    }

    fetchTrailPhotos = () => {
        this.setState({isLoading: true})
        api.photos.getPhotosByTrail(this.props.trail.id).then(json => this.setState({ photos: json, isLoading: false }))
    }

    toggleOpen = () => {
        this.setState({open: !this.state.open})
    }

    toggleDelete = id => {
        this.setState({ 
            deleteOpen: !this.state.deleteOpen,
            deletingId: id
        })
    }

    handleChange = ev => {
        console.log(ev.target.files[0])
        this.setState({photo: ev.target.files[0]})
    }

    handleSubmit = ev => {
        ev.preventDefault()
        console.log(this.state.photo)
        api.photos.addPhoto({image: {file: this.state.photo}}).then(json => console.log(json))
    }

    deletePhoto = id => {
        api.photos.deletePhoto({ id: id }).then(this.setState({ photos: this.state.photos.filter(element => element.id !== id) }))
        this.toggleDelete({ id: '' })
    }

    render() {
        return <>
            {this.state.isLoading ?
                <BasicLoader info='photos' />
            :
                this.state.photos.length > 0 ?
                    <Grid divided>
                        {this.state.photos.map(photo => {
                            return <Grid.Column>
                                <Image src={photo.img_url} />
                            </Grid.Column>
                        })}
                    </Grid>
                :
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                No photos yet, post the first one!
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            }
            <DeletePhotoModal open={this.state.deleteOpen} toggle={this.toggleDelete} deletePhoto={this.deletePhoto} id={this.state.deletingId}/>
            <AddPhotoModal open={this.state.open} toggle={this.toggleOpen} handleOnChange={this.handleChange} handleOnSubmit={this.handleSubmit}/>
        </>
    }
}

const mapStateToProps = state => {
    return { user: state.user.user }
}

const mapDispatchToProps = dispatch => ({
    fetchAuthentication: () => dispatch(fetchAuthentication())
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotosHolder);