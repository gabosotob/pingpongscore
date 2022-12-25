# Introduction

This file is intended to be read by any person who wants to know how the development planning where thought and develop.

## Requirements, Tasks & Thoughts

1. NodeJS for the backend

   - [ ] Define system architecture

     - Since it is a simple app for keeping score of pingpong games, the scope for this project is simple.
     - We'll gonna go for a simple backend with full acces for any user, so unauthenticated users can save and read app info
     - Deleting content is forbbiden and makes sense for an app that doesn't perform authentications on his users.
     - The context of the app is an organization wich people play pingpong, so a shared database will be useful for anyone playing.
     - We end up with:
       - A cloud based database for shared data.
       - 

   - [ ] Setup Express.js app file structure

2. Any database for storing data

   - [ ] Define DB type based on size, type and queries to be made to the project app
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
