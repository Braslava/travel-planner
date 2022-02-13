const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
//const fetch = require('node-fetch');
require('dotenv').config();
// enables to get portname from environment variable but use 5000 id there's none
const port = process.env.PORT || 3000;
const data = {};

const app = express();

app.use(express.static('dist'));
console.log(__dirname);

app.use(cors());

app.listen(port, () => {
	console.log(`Server running on port ${port}!`);
	console.log(`Running on http://localhost:${port}/`);
});

app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
	res.sendFile('/dist/index.html', { root: __dirname + '/../..' });
});
// app.get('/', (req, res) => {
// 	res.sendFile('dist/index.html');
// });

app.post('/addtrip', createTrip);

async function createTrip(req, res) {
	location = req.body.location;
	startDate = req.body.startDate;
	console.log(`user input is ${location} and ${startDate}`);
	const geoNamesUser = process.env.GEONAMES_USER;
	const weatherBitApiKey = process.env.WEATHERBIT_API_KEY;

	const coordinates = await getDataFromGeoNames(geoNamesUser, location);

	const weather = await getWeather(
		coordinates.lat,
		coordinates.lon,
		weatherBitApiKey
	);

	console.log(weather);
	console.log(coordinates);
	//	res.send(weather);
}

async function getDataFromGeoNames(username, city) {
	console.log('called');
	const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
	try {
		return await axios.get(url).then((res) => {
			console.log(res.data.geonames[0].lat, res.data.geonames[0].lng);
			return {
				lat: res.data.geonames[0].lat,
				lon: res.data.geonames[0].lng,
			};
		});
	} catch (e) {
		console.log(e);
	}
}

async function getWeather(lat, lon, apiKey, timing = 0) {
	const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}`;
	console.log(lat, lon);
	try {
		return await axios.get(url).then((res) => {
			console.log(res.data);
			const weatherData = {
				temperature: res.data.data[timing].temp,
				description: res.data.data[timing].weather.description,
			};
			console.log(weatherData);
			return weatherData;
		});
	} catch (e) {
		console.log(e);
	}
}
