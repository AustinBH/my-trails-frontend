import React from 'react'
import { Container, Segment, Header, Button, Image, Icon } from 'semantic-ui-react';

const About = props => {
    return <Container textAlign='center'>
        <Header as='h1' content='About'/>
        <Segment stacked>
            <Header dividing as='h3' icon textAlign='center'>
                <Icon name='map signs' circular />
                <Header.Content>My Trails</Header.Content>
            </Header>
            This application was created to be used by hiking enthusiasts and anyone who wants to experience any amount of nature.
            As someone who has grown up in the Pacific Northwest I have been very fortunate to experience quite a bit of hiking and backpacking.
            Hopefully this application will allow you to get out there and share your experiences with others.
            <Header dividing as='h3' icon textAlign='center' >
                <Icon name='street view' circular />
                <Header.Content>How to use the app</Header.Content>
            </Header>
            This is a mobile/webapp for hikers.
            You can save trails as favorites, mark trails as completed, comment on trails, upload photos of trails, and see specific trail information such as difficulty, length, ascent, a brief summary, and a preview image.
            You can search for trails based on latitude/longitude gps coordinates, several different preset locations, and your device's geolocation feature.
            <Image fluid src='https://user-images.githubusercontent.com/46305121/63454436-a8591d00-c3ff-11e9-815c-82b63250b2f8.png'/>
            <p>You can see the application in use in this
                <a href='https://youtu.be/LO-hzgt9Gaw' target='_blank' rel='noopener noreferrer'> demo video</a>
                .
            </p>
        </Segment>
        <Header as='h3' content='Features'/>
        <Segment stacked>
            <Header dividing as='h3' icon textAlign='center'>
                <Icon name='user' circular />
                <Header.Content>Account</Header.Content>
            </Header>
            On this page you can change your account information.
            You can update your username, password, avatar, and your search preferences.
            You can specify the range in miles that you want to search for trails as well as the number of trails you want to see.
            <Header dividing as='h3' icon textAlign='center'>
                <Icon name='heart' circular />
                <Header.Content>Favs</Header.Content>
            </Header>
            Here you can find all of the trails that you have favorited.
            You can view all comments and create, edit, and delete your comments.
            You can also view the full trail information such as how many users have favorited and completed the trail.
            All photos uploaded for this trail are also available from the photos button.
            You can upload new photos or even delete your previous photos as well.
            <Header dividing as='h3' icon textAlign='center'>
                <Icon name='map' circular />
                <Header.Content>Trails</Header.Content>
            </Header>
            This section displays all trails you have completed.
            Like the Favs page you can view the comments, trail info, and photos associated with trails you have completed.
            <Header dividing as='h3' icon textAlign='center'>
                <Icon name='search' circular />
                <Header.Content>Search</Header.Content>
            </Header>
            This section allows you to search for trails.
            There are 54 total locations in the dropdown menu which will let you browse trails around these areas.
            You can also use the settings button on this page to update your search settings.
            The search by coordinates feature lets you input a specific latitude and longitude to see specific trail data.
            Both of these types of search will display a map based on the coordinates you provide or location you select.
            All of the trails will also be displayed below the map.
            You can interact with these trails in the same manner as both the favs and trails pages.
            <Header dividing as='h3' icon textAlign='center'>
                <Icon name='home' circular />
                <Header.Content>Home Page</Header.Content>
            </Header>
            The home page has a hikes near me! button which will let you see hikes near your location.
            This feature requires that you have your location services turned on so that we can get trails based on the location of your device.
            The settings button here functions like the same button on the search page.
            You can specify your search settings if you want to modify your range or results.
        </Segment>
        <Header as='h3' content='Technologies' />
        <Segment stacked>
            <Header dividing as='h3' icon textAlign='center'>
                <Icon name='react' circular />
                <Header.Content>Frontend</Header.Content>
            </Header>
            The frontend of this application uses React.js, Redux.js, Redux Thunk, Google Maps API, Geolocation API, and Semantic UI.
            The Geolocation API is a bit specific so if you are accessing this website from an http connection rather than https you will not be able to use the hikes near me! feature.
            <Header dividing as='h3' icon textAlign='center'>
                <Icon name='gem' circular />
                <Header.Content>Backend</Header.Content>
            </Header>
            The backend of this application uses Rails, JWT, Hiking Project API, and AWS S3 image hosting.
            The Hiking Project API is provided by REI's Hiking Project.
            This is where the trail data is coming from.
            Their API is very robust and easy to work with, it has been an absoloute pleasure to work with for this project.
            The photos that are uploaded here are stored using AWS S3.
        </Segment>
        <Button color='brown' icon='backward' onClick={() => props.history.push('/')} content='Go Back' />
    </Container>
}

export default About;