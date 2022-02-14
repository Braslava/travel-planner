import { wait } from './helpers';
import { loader } from './elements';

export async function postData(url = '', data = {}) {
	// display a loader while fetching data

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
	document.querySelector(
		'.js-departure-countdown'
	).innerText = `[days] left until your trip to [location]!`;
	document.querySelector('.js-weather-display').innerText = `${data.weather}`;
	document.querySelector('.js-location-display').innerText = data.location;
	document.querySelector('.js-dep-date-display').innerText =
		data.departureDate;
	document.querySelector('.js-destination-image').src = data.image;
}

// asynchronous function to reset the form
export async function resetForm(formToReset) {
	await wait();
	// hides the loader
	hideLoader();
	formToReset.reset();
}

export function handleError(error) {
	alert('There was an error processing this request.', error);
}

function showLoader() {
	loader.classList.remove('hidden');
}

function hideLoader() {
	loader.classList.add('hidden');
}

// calculate days betwwn current date and start of the trip
export function checkHowLongAway(dateInputValue) {
	const today = new Date();
	// create a date object from the html input value
	const startDate = new Date(dateInputValue);
	console.log('startdate ' + startDate);
	// convert to ms, subtract and then convert back to days and round up
	const days = Math.ceil(
		(startDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
	);
	if (days < 0) {
		alert('Your departure date cannot be in the past!')
		//throw new Error('Departure date in the past!');
	}
	return days;
}
