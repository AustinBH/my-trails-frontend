# My Trails Frontend

![](https://media.giphy.com/media/JPUeiRRDOayFTv8Ntg/giphy.gif)

This web application was developed with a mobile first design. The application allows users to find trails near them, save trails to their favorites or mark them as completed. Users can also leave comments about trails as well as upload photos of their hikes.

It is currently hosted both at https://my-trails.herokuapp.com/ and http://www.my-trails.info. As the Geolocation API requires https, I would recommend using the first link for now. The app is currently supported on the latest versions of Chrome, Safari, and Firefox. It may be functional on other browsers but I have not been able to test or confirm as such at this time. The site is also fully functional on mobile.

## Demo

[![](https://user-images.githubusercontent.com/46305121/63458147-148b4f00-c407-11e9-9fda-7d8ee82862ad.png)](https://youtu.be/LO-hzgt9Gaw)

## Using the app

![](https://media.giphy.com/media/dNgK7Ws7y176U/giphy.gif)

To get started, you will have to create a user account. All you will need to signup is a username and a password.

![image](https://user-images.githubusercontent.com/46305121/63454357-895a8b00-c3ff-11e9-9aeb-8cece01f4724.png)

Once you have created your account, you can search for trails from a list of locations, use specific latitude and longitude coordinates to search for trails, or search for trails near you. The homepage has a `Hikes Near Me!` feature which will use your device's location services to find trails near you.

![Screen Shot 2019-08-21 at 10 29 43 AM](https://user-images.githubusercontent.com/46305121/63454436-a8591d00-c3ff-11e9-815c-82b63250b2f8.png)

The Nav Menu at the top of the page allows users to navigate to the edit account, favs, completed trails, search, or logout pages. Users can edit their account information such as their username, password, search preferences, and avatar.

The favs and completed trails pages allow users to see which trails they have favorited or marked as completed.

The search page allows Users to use the location and coordinate search features.

  * Trail Info
    - Every trail will have 5 buttons, Fav, Complete, Comments, More Info, and Photos.
      - Fav
        - This button will mark a trail as a favorite meaning that the button will update to reflect that the user has favorited it and it will be found under the favs menu.
      - Complete
        - This button will do the same as the favorite button but mark a trail as completed rather than favorited.
      - Comments
        ![image](https://user-images.githubusercontent.com/46305121/63454492-c45cbe80-c3ff-11e9-9890-6ba775ae679b.png)
        - This button will display all of the comments for a trail.
        - It also displays a new comment button allowing users to create a new comment for a trail.
        - Users have the ability to edit their comments as well as delete them.
        - Once you create a comment, edit and delet buttons will appear allowing you to modify your comment.
      - More Info
        ![image](https://user-images.githubusercontent.com/46305121/63454496-c757af00-c3ff-11e9-8aa7-39c0ccb043fb.png)
        - This button will display more information about a trail.
        - It currently displays a preview image, the trail name, location, summary, length, ascent, condition, and difficulty, as well as how many other users have completed or favorited the trail.
      - Photos
        ![image](https://user-images.githubusercontent.com/46305121/63454529-d76f8e80-c3ff-11e9-9dfb-d155bfb3f2b5.png)
        - This button will display all of the user photos that have been uploaded for a certain trail.
        - Similarly to the comments, users can create new photos using the new photo button as well as delete their existing photos.
        
## Technology Used

* React.js
* Semantic UI React
* Redux.js
* Redux Thunk
* Geolocation API
* Google Maps API

        
## Setting up the app

![](https://media.giphy.com/media/3boPPdHk2ueo8/giphy.gif)

To setup your own version of this application, you will need to clone down the repo and then add your own env file. In order to use the Google Maps integration, you need to provide a Google Maps API key. Once you have an API key just enter it into the .env.sample file where it says 'your-api-key-here' and remove the .sample from the .env file.

You can then run `npm install`

At this point, you can start the app using `npm start`. As the hosted backend does not accept requests from testing environments, you will need to update the API_ROOT variable found in the /src/services/api.js file. Simply replace the current root with whatever your backend is hosted on. To experience the full functionality of this application, I would recommend cloning the [Backend](https://github.com/AustinBH/my-trails-backend) as well.

Once you have a backend to query data from and a Google Maps API key to work with, you will be cooking with gas.

## Thank You!

![](https://media.giphy.com/media/26DMTEijJDudzovvO/giphy.gif)

  * [Google Map React](https://www.npmjs.com/package/google-map-react)
    - This npm package allowed me to integrate google maps and create my own custom map markers quickly and easily.
    - There are a few Google Maps packages out there but I found this one to be the best to work with.
