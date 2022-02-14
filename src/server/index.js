const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
//const fetch = require('node-fetch');
require('dotenv').config();
// enables to get portname from environment variable but use 3000 if there's none
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

app.post('/addtrip', createTripData);

async function createTripData(req, res) {
	const location = req.body.location;
	const startDate = req.body.startDate;
	const daysUntilTrip = req.body.daysUntilTrip;
	console.log(`user input is ${location} and ${startDate}`);
	const geoNamesUser = process.env.GEONAMES_USER;
	const weatherBitApiKey = process.env.WEATHERBIT_API_KEY;
	const pixabayApiKey = process.env.PIXABAY_API_KEY;

	const coordinates = await getDataFromGeoNames(geoNamesUser, location);

	const weather = await getWeather(
		coordinates.lat,
		coordinates.lon,
		weatherBitApiKey,
		daysUntilTrip
	);

	const destinationImageUrl = await getImage(pixabayApiKey, location);

	data.weatherInfo = weather;
	data.destinationImageUrl = destinationImageUrl;
	res.send(data);
}

async function getDataFromGeoNames(username, city) {
	const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
	try {
		return await axios.get(url).then((res) => {
			console.log(
				res.data.geonames[0].lat,
				res.data.geonames[0].lng,
				res.data.geonames[0].countryName
			);
			return {
				lat: res.data.geonames[0].lat,
				lon: res.data.geonames[0].lng,
				country: res.data.geonames[0].countryName,
			};
		});
	} catch (e) {
		console.log(e);
	}
}

async function getWeather(lat, lon, apiKey, day) {
	const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}`;
	console.log(lat, lon);
	if (day >= 15) {
		day = 15;
	}
	try {
		return await axios.get(url).then((res) => {
			console.log(res.data.data[day]);
			const weatherData = {
				temperature: res.data.data[day].temp,
				description: res.data.data[day].weather.description,
			};
			console.log(weatherData);
			return weatherData;
		});
	} catch (e) {
		console.log(e);
	}
}

async function getImage(apiKey, searchWord) {
	const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchWord}&image_type=photo`;
	console.log(url);
	try {
		return await axios.get(url).then((res) => {
			console.log(res.data.hits[0]);
			const photoUrl = res.data.hits[0].webformatURL;
			return photoUrl;
		});
	} catch (e) {
		console.log(e);
	}
}
