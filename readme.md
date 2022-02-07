# News Sentiment Analysis with MeaningCloud

This is a single-page web application which uses [MeaningCloud](https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc) sentiment analysis API to perform qualitative assesment of a user's entered news item.

This project demonstrates the following front end web development skills:

-   Setting up Webpack
-   Sass styles
-   Webpack Loaders and Plugins
-   Creating layouts and page design
-   Service workers
-   Using APIs and creating requests to external urls with fetch
-   Using Express to set up a back end server

## Project Requirements

This project is part of Udacity Front End Web Development Nanodegree. The requirements are:

-   [ ] Be set up with Webpack, Express, Node, and Sass, and Service Workers
-   [ ] Have separate dev and prod configurations for Webpack
-   [ ] Have the developer environment set up with the Webpack dev server
-   [ ] Have a minimum of one form field
-   [ ] Make one request to the Aylien API
-   [ ] Use Sass for styling
-   [ ] Minify js and styles in the production environment
-   [ ] Response from the API must be added to the view for a user to see
-   [ ] Be able to show content offline

## Dependencies

You need [Node.js](https://nodejs.dev/) and npm installed on you computer.

## Getting started

1. Clone this repo to your local machine.

2. Run `npm install` in the project folder on your local machine.

3. Sign up for [MeaningCloud account](https://www.meaningcloud.com/developer/create-account). An API key will be accessible in your profile.

4. Create a `.env` file in the root of your project and paste your API key in it like this:
   `API_KEY=your-api-key`

## Production mode

-   Make sure you have run `npm install`.
-   In the terminal, run `npm build-prod` followed by `npm run start`.
    The app will run on port 5000.

## Development mode

-   Make sure you have run `npm install`.
-   In the terminal, run `npm build-dev`.
-   Open up a second terminal window and execute `npm run start` (this is needed to execute the API request on the server side).
-   The app will automatically launch on Webpack Devserver on port 8080.

## Deploying

This project is deployed at TODO

## Testing

-   Run `npm install` if you haven't yet to install project dependencies
-   Run `npm test` to execute the unit tests.
