# Travel Planner

**A web tool that allows adding travel plans and displays weather information in the destination.**

This is a single-page web application which pulls data from 3 APIs - Geonames, Weatherbit, and Pixabay.

This project demonstrates the following front end web development skills:

-   HTML, CSS and SASS
-   Setting up Webpack
-   Webpack Loaders and Plugins
-   Creating layouts and page design
-   Service workers
-   Using APIs and creating requests to external urls with fetch
-   Using Express to set up a back end server

## Project Requirements

This project is part of Udacity Front End Web Development Nanodegree.

See [project rubric](https://review.udacity.com/#!/rubrics/3636/view) for more.

## Dependencies

You need [Node.js](https://nodejs.dev/) and npm installed on you computer.

## Getting started

1. Clone this repo to your local machine.

2. Run `npm install` in the project folder on your local machine.

3. Sign up for API keys TODO.

4. Create a `.env` file in the root of your project and paste your API keys in it like this:
   `API_KEY=your-api-key`

## Production mode

-   Make sure you have run `npm install`.
-   In the terminal, run `npm build` followed by `npm run start`.
    The app will run on port 5000.

## Development mode

-   Make sure you have run `npm install`.
-   In the terminal, run `npm build-dev`.
-   Open up a second terminal window and execute `npm run start` (this is needed to execute the API request on the server side).
-   The app will automatically launch on Webpack Devserver on port 8080.

## Deploying

TODO

## Testing

-   Run `npm install` if you haven't yet to install project dependencies
-   Run `npm test` to execute the unit tests.
