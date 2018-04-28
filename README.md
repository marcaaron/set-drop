## SetDrop (In Progress)
**A Set List App Connecting DJs, Fans, and Venues**

Socially driven single page app that allows DJs to publish their "set lists" from past events. Performer's can create an account, edit their public profile, manually create update or delete their set lists, and optionally use the ubiquitous software Rekordbox by Pioneer to export their past playlists to a text file that will get parsed by SetDrop and saved to the database via a RESTful API. Metadata such as date, location, and track lists are stored.

Fan users can follow performers and navigate by clicking on a venue name to retrieve sets performed at that venue or on an artist / song title to find other "sets" where those criteria appear.

**Client-side:**
- React
- SCSS
- React Router
- Firebase (for user authentication)

**Server-side:**
- Express
- MongoDB

*This is a work in progress, but anyone interested in contributing can pull the most recent source code and set up their own sandbox database and firebase app.*

## Get Started
* `npm install` within project root and `/client` root to save dependencies
* set up a MongoDB server via [mlab](http://mlab.com) or [locally](https://docs.mongodb.com/)
	* Add `.env` file to server root with `MONGO_URI=mongodb://<dbuser>:<dbpassword>@< your-mongo-address >`
* set up Firebase app
	* Add `.env` file to `/client` root with `REACT_APP_API_KEY=< your firebase app api key >`
* To run app locally, enter `npm run dev` at the project root - this will launch both NodeJS servers and a React front-end development server
* To test on a live server run `npm run build` within the `/client` root and deploy to your host. Update the `process.env` variables with your host if applicable.
