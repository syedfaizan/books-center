# API server for Books Center

### Prerequisites:

- NodeJS installed
- MySQL installed and running

## Start the backend

```sh
$ npm install
Create a new empty database named 'books_center' using phpmyadmin
$ npm run migrate
$ npm run populate-sample-data
$ npm start
```

###### Note: API server runs on port 4000

## Start the frontend

```sh
$ cd ui
$ npm install
$ npm start
```

- Visit http://localhost:3000
- enter `syedfaizan` as the username as thats the only user in the database to activate session (JWT is created in the BG)
- explore the books Page, Search by title, author, genre and also within a window of published dates

### Run Test Cases

```sh
$ npm test
```

###### Syed Faizan
