## Authors

- [@Gabosotob](https://www.github.com/gabosotob)

# Ping-Pong Score

Simple API for keeping track of ping-pong game matches.

## Features

- Save and read game records
- Save and read user names

## API Reference

#### Get Game/All Games

```http
  GET /api/games?id=<game-id>
```

| Query | Type     | Description                                  |
| :---- | :------- | :------------------------------------------- |
| `id`  | `string` | **Optional**. returns the specific game info |

#### Save Game

```http
  GET /api/games
```

| Parameter | Type               | Description                                                    |
| :-------- | :----------------- | :------------------------------------------------------------- |
| `body`    | `application/json` | **Required**. json object representing the game record to save |

```json
{
  "game": {
    "team": {
      "A": {
        "score": 3,
        "players": [{ "name": "Drasus" }]
      },
      "B": {
        "score": 4,
        "players": [{ "name": "Mattias" }]
      }
    },
    "status": {
      "scoreDiff": 1,
      "winners": [{ "name": "Mattias" }]
    }
  }
}
```

#### Get User/All Users

```http
  GET /api/users?id=<user-id>
```

| Query | Type     | Description                                  |
| :---- | :------- | :------------------------------------------- |
| `id`  | `string` | **Optional**. returns the specific user info |

#### Save User

```http
  GET /api/users
```

| Parameter | Type               | Description                                             |
| :-------- | :----------------- | :------------------------------------------------------ |
| `body`    | `application/json` | **Required**. json object representing the user to save |

```json
{
  "user": { "name": "Drobar" }
}
```

## Installation

This project is intended to run locally on a developer's windows machine.

Clone the project

```bash
  git clone https://link-to-project
```

## Deploy & Run (local)

To deploy this project run

```bash
  npm run deploy
```

## Running Tests

To run tests, run the following command

```bash
  npm test
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`
`PORT`
`MONGO_USER`
`MONGO_PASSWORD`
`MONGO_CLUSTER_NAME`
`MONGO_DATABASE_NAME`
`MONGO_TESTING_DATABASE_NAME`
