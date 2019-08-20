# My Trails Frontend

![](https://media.giphy.com/media/JPUeiRRDOayFTv8Ntg/giphy.gif)

This web application was developed with a mobile first design. The application allows users to find trails near them, save trails to their favorites or mark them as completed. Users can also leave comments about trails as well as upload photos of their hikes.

## Using the app

![](https://media.giphy.com/media/dNgK7Ws7y176U/giphy.gif)

To get started, you will have to create a user account. All you will need to signup is a username and a password.

Once you have created your account, you can search for trails from a list of locations, use specific latitude and longitude coordinates to search for trails, or search for trails near you. The homepage has a `Hikes Near Me!` feature which will use your device's location services to find trails near you.

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
        - This button will display all of the comments for a trail.
        - It also displays a new comment button allowing users to create a new comment for a trail.
        - Users have the ability to edit their comments as well as delete them.
        - Once you create a comment, edit and delet buttons will appear allowing you to modify your comment.
      - More Info
        - This button will display more information about a trail.
        - It currently displays a preview image, the trail name, location, summary, length, ascent, condition, and difficulty, as well as how many other users have completed or favorited the trail.
      - Photos
        - This button will display all of the user photos that have been uploaded for a certain trail.
        - Similarly to the comments, users can create new photos using the new photo button as well as delete their existing photos.
        
## Setting up the app

![](https://media.giphy.com/media/3boPPdHk2ueo8/giphy.gif)

To setup your own version of this application, you will need to clone down the repo and then add your own env file. In order to use the Google Maps integration, you need to provide a Google Maps API key. Once you have an API key just enter it into the .env.sample file where it says 'your-api-key-here' and remove the .sample from the .env file.

Once you have the API key setup, you can simply open the app and run it. As the hosted backend does not accept requests from testing environments, you will need to update the API_ROOT variable found in the /src/services/api.js file. Simply replace the current root with whatever your backend is hosted on. To experience the full functionality of this application, I would recommend cloning the [Backend](https://github.com/AustinBH/my-trails-backend) as well.

Once you have a backend to query data from and a Google Maps API key to work with, you will be cooking with gas.

## Thank You!

![](https://media.giphy.com/media/26DMTEijJDudzovvO/giphy.gif)

  * [Google Map React](https://www.npmjs.com/package/google-map-react)
    - This npm package allowed me to integrate google maps and create my own custom map markers quickly and easily.
    - There are a few Google Maps packages out there but I found this one to be the best to work with.
