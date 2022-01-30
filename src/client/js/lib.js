

export async function getAnalysis(urlToAnalyze) {
	const base = 'https://api.meaningcloud.com/sentiment-2.1';
	//https://api.meaningcloud.com/sentiment-2.1?key=API_KEY&of=json&url=<URL_INPUT>&lang=en
	const apiKey = process.env.API_KEY;
	const url = `${base}?key=${apiKey}&lang=auto&url=${urlToAnalyze}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log('error', error);
	}
}

export async function updateResults(data) {
	const polarityScore = document.querySelector('#polarity');
	const agreementScore = document.querySelector('#agreement');
	const confidenceScore = document.querySelector('#confidence');
	const ironyScore = document.querySelector('#irony');
	const subjectivityScore = document.querySelector('#subjectivity');

	polarityScore.innerText = data.score_tag;
	agreementScore.innerText = data.agreement;
	confidenceScore.innerText = data.confidence;
	ironyScore.innerText = data.irony;
	subjectivityScore.innerText = data.subjectivity;
}
