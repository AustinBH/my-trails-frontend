import React, { Component } from 'react';
import { Grid, Label, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCompletedHikes } from '../actions/completedHikeActions';
import { fetchFavorites } from '../actions/favoriteActions';

class InfoHolder extends Component {

    // Adding some placeholder images for when there is no image for the trail
    placeholders = [
        <Image className='info-image' size='medium' src='https://placekitten.com/640/360' alt='trail placeholder' />,
        <Image className='info-image' size='medium' src='https://placekitten.com/580/360' alt='trail placeholder' />,
        <Image className='info-image' size='medium' src='https://placekitten.com/520/360' alt='trail placeholder' />,
        <Image className='info-image' size='medium' src='https://placekitten.com/460/360' alt='trail placeholder' />,
        <Image className='info-image' size='medium' src='https://placekitten.com/360/360' alt='trail placeholder' />
    ]

    capitalize = str => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    // Converted this functional into a class component for lifecycle methods to fetch and remove completions + favs
    componentDidMount() {
        this.props.fetchCompletedHikes(this.props.trail.id)
        this.props.fetchFavorites(this.props.trail.id)
    }

    // This function clears out the redux store for the next info query
    componentWillUnmount() {
        this.props.removeCompletedHikes()
        this.props.removeFavorites()
    }

    // The following two functions are going to display our fav and completion counts
    displayFavorites = () => {
        let favs = this.props.favorites
        if (favs) {
            if (favs.length === 1) {
                return `${favs.length} user has faved this trail!`
            } else {
                return `${favs.length} users have faved this trail!`
            }
        }
    }

    displayCompletions = () => {
        let completions = this.props.completedHikes
        if (completions) {
            if (completions.length === 1) {
                return `${completions.length} user has hiked this trail!`
            } else {
                return `${completions.length} users have hiked this trail!`
            }
        }
    }

    render() {
        return <Grid columns={3} celled='internally'>
            <Grid.Row>
                <Grid.Column width={16}>
                    {this.props.trail.imgMedium ?
                        <Image className='info-image' size='medium' src={this.props.trail.imgMedium} alt={this.props.trail.name} />
                        :
                        this.placeholders[Math.floor(Math.random() * Math.floor(this.placeholders.length))]
                    }
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={10}>
                    <Label color='brown'>Summary</Label>
                    <p>{this.props.trail.summary}</p>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Label color='brown'>Location</Label>
                    <p>{this.props.trail.location}</p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Label color='brown'>Completions</Label>
                    <p>{this.displayCompletions()} </p>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Label color='brown'>Favs</Label>
                    <p>{this.displayFavorites()} </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Label color='brown'>Length</Label>
                    <p>{this.props.trail.length} miles</p>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Label color='brown'>Ascent</Label>
                    <p>{this.props.trail.ascent} ft</p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={6}>
                    <Label color='brown'>Condition</Label>
                    <p>{this.props.trail.conditionStatus}</p>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Label color='brown'>Details</Label>
                    <p>{this.props.trail.conditionDetails || 'No details available at this time'}</p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={7}>
                    <Label color='brown'>Difficulty</Label>
                    <p>{this.capitalize(this.props.trail.difficulty)}</p>
                </Grid.Column>
                <Grid.Column width={9}>
                    <Label color='brown'>Difficulty Scale</Label>
                    <p className='difficulty'>Green: Easy</p>
                    <p className='difficulty'>Blue: Intermediate</p>
                    <p className='difficulty'>Black: Difficult</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    }
}

const mapStateToProps = state => {
    return {completedHikes: state.completedHikes, favorites: state.favorites}
}

const mapDispatchToProps = dispatch => ({
    fetchCompletedHikes: (data) => dispatch(fetchCompletedHikes(data)),
    fetchFavorites: (data) => dispatch(fetchFavorites(data)),
    removeCompletedHikes: () => dispatch({ type: 'DELETECOMPLETEDHIKES'}),
    removeFavorites: () => dispatch({ type: 'DELETEFAVORITES'})
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoHolder);