const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.static('dist'));
console.log(__dirname);

app.use(cors());

app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
	res.status(200).sendFile('/dist/index.html', {
		root: __dirname + '/../..',
	});
});

app.post('/addtrip', createTripData);

async function createTripData(req, res) {
	const tripData = {};
	// extracting data from the request body
	const location = req.body.location;
	const startDate = req.body.startDate;
	const daysUntilTrip = req.body.daysUntilTrip;
	// validate the input and return res.send('invalid input', 400 if nothing there)
	// ToDo create a function isValidDate format to check if there's valid date input
	if (!location || !startDate) {
		return res.status(400).send('Invalid input');
	}

	console.log(
		`user input is ${location} and ${startDate} and their trip is in ${daysUntilTrip} days`
	);
	// accessing API keys
	const geoNamesUser = process.env.GEONAMES_USER;
	const weatherBitApiKey = process.env.WEATHERBIT_API_KEY;
	const pixabayApiKey = process.env.PIXABAY_API_KEY;

	// fetching latitude, longitude and countryname of the deestination
	const geoNamesData = await getDataFromGeoNames(geoNamesUser, location);

	// fetching weather data - temperature and description
	const weatherInfo = await getWeather(
		geoNamesData.lat,
		geoNamesData.lon,
		weatherBitApiKey,
		daysUntilTrip
	);
	console.log(weatherInfo);

	// fetching an image of the location but if none retrieved use the country from geonames data as a search term
	let destinationImageUrl = await getImage(pixabayApiKey, location);
	if (!destinationImageUrl) {
		destinationImageUrl = await getImage(
			pixabayApiKey,
			geoNamesData.country
		);
	}

	// assigning the data to the object that is sent in response
	tripData.weatherInfo = weatherInfo;
	tripData.destinationImageUrl = destinationImageUrl;
	tripData.country = geoNamesData.country;
	//data.push(tripData);
	res.send(tripData);
	console.log(tripData);
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

module.exports = app;