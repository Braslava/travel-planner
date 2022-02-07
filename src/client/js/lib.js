import { wait } from './helpers';
import { loader } from './elements';
import { submitButton } from './elements';

export async function postData(url = '', data = {}) {
	// hide the submit button
	submitButton.classList.add('hidden');
	// display a loader while fetching data
	loader.classList.remove('hidden');

	try {
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			// Body data type must match "Content-Type" header
			body: JSON.stringify(data),
		});
		const newData = await response.json();
		console.log(newData);
		return newData;
	} catch (error) {
		//handleError(error);
		console.log('error', error);
	}
}

export async function updateResults(data) {
	// select the results display elements and set their content to the received data
	document.querySelector('#polarity').innerText = data.polarity;
	document.querySelector('#agreement').innerText = data.agreement;
	document.querySelector('#confidence').innerText = data.confidence;
	document.querySelector('#irony').innerText = data.irony;
	document.querySelector('#subjectivity').innerText = data.subjectivity;
}

// asynchronous function to reset the form
export async function resetForm(formToReset) {
	await wait();
	// hides the loader
	loader.classList.add('hidden');
	// show the submit button
	submitButton.classList.remove('hidden');
	formToReset.reset();
}

export function handleError(error) {
	alert('There was an error processing this request.', error);
}
