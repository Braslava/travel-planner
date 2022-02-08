const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();
// enables to get portname from environment variable but use 5000 id there's none
const port = process.env.PORT || 5000;

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
})
// app.get('/', (req, res) => {
// 	res.sendFile('dist/index.html');
// });

app.post('/analyze', postSentimentData);

async function postSentimentData(req, res) {
	userInput = req.body.url;
	console.log(`user input is ${userInput}`);
	const apiKey = process.env.API_KEY;
	const base = 'https://api.meaningcloud.com/sentiment-2.1';
	const url = `${base}?key=${apiKey}&lang=auto&url=${userInput}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		// extract the necessary data from the response
		const sentimentData = {
			polarity: data.score_tag,
			agreement: data.agreement,
			confidence: data.confidence,
			irony: data.irony,
			subjectivity: data.subjectivity,
		};
		console.log(sentimentData);
		res.send(sentimentData);
	} catch (error) {
		console.error(error);
		res.send(error);
	}
}
