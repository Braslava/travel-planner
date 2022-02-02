const port = 5000;
const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

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
	res.sendFile('dist/index.html');
});

app.post('/analyze', async (req, res) => {
	userInput = req.body.url;
	console.log(`user input is ${userInput}`);
	const apiKey = process.env.API_KEY;
	const base = 'https://api.meaningcloud.com/sentiment-2.1';
	const url = `${base}?key=${apiKey}&lang=auto&url=${userInput}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		res.send(data);
	} catch (error) {
		console.error(error);
	}
});
