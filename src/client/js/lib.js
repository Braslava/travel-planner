import { wait } from './helpers';
import { loader } from './elements';

// Select user's form input - location and date

// Convert the location name to latitude and longitude uising Geonames API
// Send the location to server in a POST request

// Use the latitude and longitude to get weather forecast from Weatherbit

// Calculate how many days away the departure is.

// Check if it is more than 7 days

// If true get current weather forecast

// If false - get future wether forecasst

// If it is more than 16 days away, display weather on day 16th with a note that forecast after date X is not available

// retrieve and image of the location from Pixabay API

// update UI with the location, days until the trip, weather forecast and an image of the destination

export async function postData(url = '', data = {}) {
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
	formToReset.reset();
}

export function handleError(error) {
	alert('There was an error processing this request.', error);
}
