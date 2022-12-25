# Introduction

This file is intended to be read by any person who wants to know how the development planning where thought and develop.

## Requirements, Tasks & Thoughts

1. NodeJS for the backend

   - [ ] Define system architecture

     Since it is a simple app for keeping score of ping-pong games, the scope of this project is simple:

     - We'll gonna go for a simple backend with full access for any user, so unauthenticated users can save and read app info
     - Deleting content is forbidden and makes sense for an app that doesn't perform authentications on its users.
     - The context of the app is an organization in which people play ping-pong, so a shared database will be useful for anyone playing to save the game score on a shared company database.

     We end up with:

     - A cloud-based database for shared data.
     - A local API for communicating with external DB.

   - [ ] Setup Express.js app file structure

     - Because makes more sense to work with the endpoints as actions for the entities of the app, the folder structure for the API will be their entities, so whatever case we are in with users, we will only touch the user's folder. Our folder structure for the source code looks like this:

       📦src
       ┣ 📂api // Here goes all related entities to interact with the app and database
       ┃ ┣ 📂games // Every file related to interacting with the games
       ┃ ┣ 📂users // Every file related to interacting with the users
       ┣ 📂configs // Contains all the configuration data files like environment variables
       ┗ 📂loaders // Files with the setup of dependencies of the app

2. Any database for storing data

   - [ ] ## Define DB type based on size, type and queries to be made to the project app
   - [ ] Make ER Diagram

     - [ ] Define User model
     - [ ] Define Game model

3. At least 4 APIs (Up to you to decide; but adding some examples: Save users, get games, get users, get top performer from the last 5 games, save game)

   - [ ] Define Storybook

     - A user enters the Ping Ping App, introduces players 1 and 2 names, then starts a new game
     - On the new game screen, A user adds wins to the corresponding player and sees the current score of each player with the resulting score difference between players, and the current winner of the playing game
     - Once the game has been seized, a user saves the game score into the app's game records

   - [ ] Define and design API endpoints

     Required for Prototype:

     - [ ] Save game

     Extra

     - [ ] Get games
     - [ ] Save users
     - [ ] Get users
     - [ ]

4. You must use some linter for the code
   - Define linter, standard and guide rules
   - Define formatter
5. You must use git for version control (at least 2 commits)
6. You must have at least one test
7. You must include a README with instructions on how to run the application
8. Not required to create a front-end. However, if you manage to build a small UI that would be great.
