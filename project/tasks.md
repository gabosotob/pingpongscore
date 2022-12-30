# Introduction

This file is intended to be read by any person who wants to know how the development planning where thought and develop.

## Requirements, Tasks & Thoughts

On each requirement, a task would be assigned and all the **thought process** for choosing each solution is written inside, along with the solution.

### 1. NodeJS for the backend

- [x] Define system communication architecture

  #### Context

  The context of the app is an organization in which people play ping-pong matches, so a shared database will be useful for anyone playing to save the game score on a shared company database.
  Since it is a simple app for keeping score of ping-pong games, the scope of this project is simple:

  - We'll gonna go for a simple backend with full access for any user, so unauthenticated users can save and read app info, in other words... is gonna be a public API.
  - Deleting content is forbidden, this makes sense for an app that doesn't perform authentications on its users.

  Maybe it's not that safe that any user can see and save a user/game into the company's database, but we're going to make an MVP API to show what the app can do, we can then integrate some authentication middleware.

  **NOTE:** we're developers who are going to be making the testing with the users, so... we're bringing our laptops.

  We end up with:

  - A cloud-based database for shared data so we don't worry about setting up a local DB.
  - A local API for communicating with external DB.

- [x] Setup Express.js app file structure

  Because makes more sense to work with the endpoints as actions for the entities of the app, the folder structure for the API will be their entities, so whatever case we are in with users, we will only touch the user's folder. Our folder structure for the source code looks like this:

  📦src  
  ┣ 📂api  
  ┃ ┣ 📂games  
  ┃ ┃ ┣ 📜gamesService.test.js  
  ┃ ┃ ┣ 📜model.js  
  ┃ ┃ ┣ 📜router.js  
  ┃ ┃ ┗ 📜service.js  
  ┃ ┣ 📂middleware  
  ┃ ┃ ┗ 📜celebrations.js  
  ┃ ┣ 📂users  
  ┃ ┃ ┣ 📜model.js  
  ┃ ┃ ┣ 📜router.js  
  ┃ ┃ ┣ 📜service.js  
  ┃ ┃ ┗ 📜usersService.test.js  
  ┃ ┗ 📜index.js  
  ┣ 📂configs  
  ┃ ┗ 📜index.js  
  ┣ 📂helpers  
  ┃ ┗ 📜promises.js  
  ┣ 📂loaders  
  ┃ ┣ 📜express.js  
  ┃ ┣ 📜index.js  
  ┃ ┗ 📜mongoose.js  
  ┗ 📜app.js

- **app.js:** where all starts, calling the loaders, importing express.js and setting up the port to listen for requests.
- **src.api:** contains all the information regarding the specific API files.
  - **index.js:** provides routing for all the entity's endpoints.
  - **src.api.entity:** contains all the files regarding the route, service and model for interaction with the entity.
    - **router.js:** this file is intended to contain the router for the entity and the corresponding controller embedded in the endpoints.
    - **service:** logic of the API where the executing task of the endpoint's controller does all the procedures required to make the task. **Quicknote:** Services can interact with other entities' services.
    - **model.js** corresponds with the Schema/Class that makes the actual manipulation of the DB.
  - **src.api.middleware:** created to contain all the functions that run between the main router and the endpoint's controller.
    - **celebrations.js:** all the files regarding request validation goes here
- **src.configs:** files for holding the startup configuration variables for the API, because there are not many variables to set, a single file will be used.
  - **index.js:** contains all the environment variables to use on the app.
- **src.helpers:** simple files that contain helper functions for the services.
- **promises.js:** a file containing a simple function using mainly promises.
- **src.loaders:** here will be the files that use the _configs_ files to set up the API on the startup.
  - **express.js:** configures all the app _global_ middleware that is going to be used in **every\*\*** request.
  - **mongoose.js:** sets up the connection for the cloud database.
  - **index.js:** imports all the loader functions for the app.js to use.

### 2. Any database for storing data

- [x] Define DB type based on size, type and queries to be made to the project app

  - Since it's a small app and will be a small development, we'll gonna use MongoDB for simple and easy configuration using Javascript.
  - We'll use Mongo Atlas for our cloud-based DB.

- [x] Make ER Diagram

  The provided prototype only shows the use of the "Save Game" feature, but since 4 endpoints are needed for this project, **Games** and **Users** entities will be defined.

- [x] Define User model

  The model for the User is the name, the IDs of the winning games, and the IDs of the overall played games.

  ```javascript
  new Schema({
    name: { type: String, required: true, unique: true },
    wins: { type: Number, required: true, default: 0 },
  });
  ```

  - [x] Define Game mode

    The model for the Games is an array that represents the teams of the game, each team has a side of the table, the score and an array of player IDs. Then it's the status of the game, an object that contains the score difference between the teams

    ```javascript
    new Schema({
      team: {
        A: {
          score: { type: Number, required: true },
          players: {
            type: [{ type: ObjectId, ref: 'user' }],
            minLength: 1,
            maxLength: 2,
          },
        },
        B: {
          score: { type: Number, required: true },
          players: {
            type: [{ type: ObjectId, ref: 'user' }],
            minLength: 1,
            maxLength: 2,
          },
        },
      },
      status: {
        scoreDiff: Number,
        winners: [{ type: ObjectId, ref: 'user' }],
      },
    });
    ```

### 3. At least 4 APIs (Up to you to decide; but adding some examples: Save users, get games, get users, get top performer from the last 5 games, save game)

- [x] Define Storybook

  - A user enters the Ping Ping App, introduces players 1 and 2 names, then starts a new game
  - On the new game screen, A user adds wins to the corresponding player and sees the current score of each player with the resulting score difference between players, and the current winner of the playing game
  - Once the game has been seized, a user saves the game score into the app's game records

- [x] Design API endpoints

  Required for Prototype:

  - Save game: saves a game record
  - Get games: returns all the game records, or a single game record
  - Save users: saves a user
  - Get users: returns all the user's info, or a single user's info

### 4. You must use some linter for the code

- [x] Define linter, standard and guide rules
  - We'll use the Airbnb coding standard as the base rules
  - Some coding rules will be overwritten for customizing our coding standard
- [x] Define formatter
  - Prettier will be our default formatter

### 5. You must use git for version control (at least 2 commits)

- [x] Make two commits
- [x] Make branches for specific features
- [x] Merge all branches into the main branch

### 6. You must have at least one test

- [x] Have a test for every main service process

### 7. You must include a README with instructions on how to run the application

- [x] Include authors
- [x] Include features
- [x] Include API Reference
- [x] Installation
- [x] How to run
- [x] Running test
- [x] Environment variable

### 8. Not required to create a front-end. However, if you manage to build a small UI that would be great.
