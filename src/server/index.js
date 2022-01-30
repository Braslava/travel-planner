// import { json as mockAPIResponse } from './mock-api.js'; - would need type: module in package.json
const path = require('path');
const express = require('express');
const mockAPIResponse = require('./mock-api.js');
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.API_KEY;

const app = express();

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
	res.sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
app.listen(5000, function () {
	console.log('Example app listening on port 5000!');
});

app.get('/test', function (req, res) {
	res.send(mockAPIResponse);
});
