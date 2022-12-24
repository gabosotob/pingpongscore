## Authors

- [@octokatherine](https://www.github.com/octokatherine)

# Project Title

A brief description of what this project does and who it's for

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Roadmap

- Additional browser support

- Add more integrations

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`
