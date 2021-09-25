# koleo-clone-backend
---
Simple backend for koleo-clone project created with Node.js, Express, MongoDB and Typescript.

## Table of contents
---
* [koleo-clone project](#koleo-clone)
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)
* [Inspiration](#inspiration)

## koleo-clone project
---
This app is part of koleo-clone project which consist of koleo-clone-backend and [koleo-clone-frontend]("https://github.com/marolis1239/koleo-clone-frontend") also written by me with React.

You can play with whole project deployed to heroku (backend) and firebase (frontend) by clicking this [URL]("https://koleo-clone.web.app/").

Implemented connections:
* Wrocław Główny - Wrocław Mikołajów - Wrocław Nadodrze - Wrocław Psie Pole

Connection dates aren't implemented so you will se the same connections on every date.
Connection changes aren't implemented so you have to choose direct route to see connection.
If you choose discount for created user you will have 50% discount on your tickets.

## General info
---
This project is simple backend for koleo-clone project. It provides REST endpoints for handling users, connections and tickets.

## Features
---
* /auth routes for managing user creation, authentication and setting user data
* /cities routes for adding and fetching cities from the app
* /connections routes for adding and fetching connections from the app
* /tickets routes for creating and fetching tickets from the app
* you can add cities and connections only with manually added user with admin privileges
	
## Technologies
---
Project is created with:
* Node.js version: 14.17.0
* Express version: 4.17.1
* MongoDB version: 4.4.9
* Typescript version: 4.4.3
	
## Setup
---
koleo-clone-backend requires Node.js v10+ and MongoDB database to run.
(You can use free mongoDB hosting by [MongoDB Atlas]("https://www.mongodb.com/cloud/atlas")).

Then you have to provide .env file in the root folder with following variables declared:
```
DB_URL=your_database_url

JWT_SECRET=secret_for_jwt_tokens
```

To run this project, install it locally using npm or yarn:

```
$ npm install
```
```
$ yarn install
```

After installing dependencies and after every change to typescript files you have to compile typescript into javascript:

```
$ tsc
```

To start development server which features auto restart after typescript compile:

```
$ npm run dev
```
```
$ yarn dev
```

To run production server:

```
$ NODE_ENV=production npm start
```
```
$ NODE_ENV=production yarn start
```

## Inspiration
---
This app is based on popular web application [KOLEO](https://koleo.pl/)


