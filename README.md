# DogGo!
DogGo is a full-stack applicaiton, that solves one part of of the navigation problem in which a user wants to find specific things along a route. While the focus in this application is dog friendly places. The implication extends to any google map searchable group or places. 

![main site](https://i.ibb.co/PYQ8P2Z/image.png)

## Summary
Most of the heavy lifting is handled by the client. Google Maps' API is handled without any helper libraries which allows for a more intuitive understanding. Much of its functionality is pulled out over various files to accomplish encapsulating various parts of the API. A library called [RouteBoxer](https://github.com/googlemaps/v3-utility-library/tree/master/routeboxer) is used to create an array of bounds from a users route query. This array is then iterated over for a users search selection.

## Technology
This application uses React to implement the frontend, interesting aspects of which include React Router, React Hooks, and React Portals. The styling is plain css. On the serverside, Node, mounted with Express is used to manage the routing and middleware. Authentication is implemented with bcrypt, and JWTs. Finally the database in use is PostgreSQL connected to the server with Knex.

## Installation

While the application lives at [here](https://dog-go.netlify.com). The server and client repos can be found here: 

Client: [link](https://github.com/jamster10/doggo-client)

Server: [link](https://github.com/jamster10/doggo-server)

To install the client run

```
npm i
```
Add a .env file  for your Google Maps api key, and edit the config file to connect with localhost server.

Similarly, to install the server, run 
```
npm i
```
To get the server up and running with its databases create a local sql db and confirm your database matches the current settings in PostgratorConfig.js, or change your settings to match.
```
module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'host': process.env.HOST,
  'port': process.env.DB_PORT,
  'database': process.env.MIGRATION_DATABASE,
  'username': process.env.USER,
  'password': process.env.PASSWORD,
  'ssl': true
};
```
Of course, set up you .env with the correct varaibles to match.
Include defaults for your JWT tokens
```

JWT_EXPIRATION=[your expiration time, for eg: 50h] 
JWT_SECRET=[your secret]
```

Finally 
```
npm run migrate
```
To get the database tables ready, and seed it with data from seeds folder if you choose.

The server requires nodemon in dev mode if you wish to make multiple chages to the server and test them. 
```npm i nodemon```

## API Usage

The server uses authentication on all routes. Except for register, and login.
Registration takes a username and password, as does login.

The places route allows a user to GET all their saved places, POST a new place, or DELETE a place they liked.

A request goes to the server in the endpoint format /api/places

a GET request might look like: 

```
getPlaces() {
    return fetch(`${config.API_ENDPOINT}/places`, {
      headers: {
        'authorization': `bearer [usersauthToken]`,
      },
```

with a response of
```
[
 {
   address: "2330 S Lamar Blvd #200, Austin, TX 78704"
   name: "Kriser's Natural Pet"
   place_id: "ChIJ27HBRSu1RIYRauFUnO9NIgw"
   price_level: "n/a"
   rating: "4.8"
   saved: "true"
   user_id: "1"
   user_ratings_total: "27"
},
{
   address: "2050 S Lamar Blvd, Austin, TX 78704"
   name: "Opa Coffee and Wine Bar"
   place_id: "ChIJL5GO19i0RIYRkg9oMW_kpFs"
   price_level: "2"
   rating: "4.5"
   saved: "true"
   user_id: "1"
   user_ratings_total: "456"
}]
```
In posting a new place, the following fields are required:
   address,
   name,
   place_id,
   price_level,
   rating,
   user_ratings_total,
   saved

An example request might look like:
```
return fetch(`${config.API_ENDPOINT}/places`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        address: place.address,
        name: place.name,
        place_id: place.place_id,
        price_level: place.price_level,
        rating: place.rating,
        user_ratings_total: place.user_ratings_total,
        saved: place.saved
      }),
```
Finally to delete a place send the place_id of the place to be deleted.
```
return fetch(`${config.API_ENDPOINT}/places/${placeId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
