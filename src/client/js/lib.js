import { wait } from './helpers';
import { loader } from './elements';

export async function postData(url = '', data = {}) {
	loader.classList.remove('hidden');
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		// Body data type must match "Content-Type" header
		body: JSON.stringify(data),
	});

	try {
		const newData = await response.json();
		console.log(newData);
		loader.classList.add('hidden');
		return newData;
	} catch (error) {
		console.log('error', error);
	}
}

export async function updateResults(data) {
	// select the results display elements
	const polarityScore = document.querySelector('#polarity');
	const agreementScore = document.querySelector('#agreement');
	const confidenceScore = document.querySelector('#confidence');
	const ironyScore = document.querySelector('#irony');
	const subjectivityScore = document.querySelector('#subjectivity');

	// set their content to the received data
	polarityScore.innerText = data.polarity;
	agreementScore.innerText = data.agreement;
	confidenceScore.innerText = data.confidence;
	ironyScore.innerText = data.irony;
	subjectivityScore.innerText = data.subjectivity;
}

// asynchronous function to reset the form
export async function resetForm(formToReset) {
	await wait();
	formToReset.reset();
}
