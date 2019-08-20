import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Image, Comment, Button } from 'semantic-ui-react';
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
        deletingImage: {},
        photoUrl: '',
        newLoading: false
    }

    /* 
    After the component mounts to the DOM we want to verify the
    user information so that we can properly associate a user with
    their photos. We also want to then fetch all of the photos
    associated with a trail
    */
    componentDidMount() {
        this.props.fetchAuthentication()
        this.fetchTrailPhotos()
    }

    // We want to update the photos if a user selects a different trail
    componentDidUpdate(prevProps) {
        if (this.props.trail.id !== prevProps.trail.id) {
            this.fetchTrailPhotos()
        }
    }

    // This function provides a loading indicator while fetching photos from our backend
    fetchTrailPhotos = () => {
        this.setState({isLoading: true})
        api.photos.getPhotosByTrail(this.props.trail.id).then(json => this.setState({ photos: json, isLoading: false }))
    }

    // This toggles our new photo modal
    toggleOpen = () => {
        this.setState({open: !this.state.open})
    }

    // This toggles our delete photo modal
    toggleDelete = image => {
        this.setState({ 
            deleteOpen: !this.state.deleteOpen,
            deletingImage: image
        })
    }

    // Here we are able to capture the file input from the user so that we can upload the photo to AWS
    handleChange = ev => {
        this.setState({photoFileName: ev.target.files[0].name})
        const reader = new FileReader()
        reader.readAsDataURL(ev.target.files[0])
        reader.onload = () => {
            this.setState({
                photoFile: reader.result
            })
        }
    }

    // Here we submit our photo and await a response. I added a loading indicator while the fetch is proceeding
    handleSubmit = ev => {
        ev.preventDefault()
        this.setState({newLoading: true})
        let image = { user_id: this.props.user.id, trail_id: this.props.trail.id, photo_file: this.state.photoFile, photo_file_name: this.state.photoFileName }
        api.photos.addPhoto({image: image}).then(json => {
            if (!json.error) {
                this.toggleOpen()
                this.setState({ photos: [...this.state.photos, json.image], newLoading: false })
            }
        })
    }

    // Here we are actually deleting a photo uploaded by a user
    deletePhoto = image => {
        api.photos.deletePhoto({ image: {id: image.id, img_url: image.img_url} }).then(this.setState({ photos: this.state.photos.filter(element => element.id !== image.id) }))
        this.toggleDelete({ id: '' })
    }

    render() {
        return <>
            <Comment.Group>
            {this.state.isLoading ?
                <BasicLoader info='photos' />
            :
                this.state.photos.length > 0 ?
                            this.state.photos.map((photo, idx) => {
                                return <Comment key={idx}>
                                    <Comment.Avatar src={photo.avatar} />
                                    <Comment.Author as='a' content={photo.username} />
                                    <Image src={photo.img_url} size='small' rounded/>
                                    {photo.username === this.props.user.username ? 
                                        <Button className='delete-photo' size='mini' icon='trash alternate' negative onClick={() => this.toggleDelete(photo)} content='Delete' />
                                    :
                                        null
                                    }
                                </Comment>
                            })
                :
                    <p>No photos yet, post the first one!</p>
            }
            </Comment.Group>
            <DeletePhotoModal open={this.state.deleteOpen} toggle={this.toggleDelete} deletePhoto={this.deletePhoto} image={this.state.deletingImage}/>
            <AddPhotoModal open={this.state.open} toggle={this.toggleOpen} handleOnChange={this.handleChange} handleOnSubmit={this.handleSubmit} loading={this.state.newLoading}/>
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