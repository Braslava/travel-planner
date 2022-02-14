import { wait } from './helpers';
import { loader } from './elements';

export async function postData(url = '', data = {}) {
	// display a loader while fetching data
	showLoader();

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

export async function updateTripDisplay(
	destination,
	daysUntilTrip,
	departureDate,
	imageUrl,
	temperature,
	weatherDescription
) {
	// select the results display elements and set their content to the received data
	document.querySelector(
		'.js-departure-countdown'
	).innerText = `${daysUntilTrip} days left until your trip to ${destination}!`;
	document.querySelector(
		'.js-weather-display'
	).innerText = `${weatherDescription} and ${temperature} degress`;
	document.querySelector('.js-location-display').innerText = destination;
	document.querySelector('.js-dep-date-display').innerText = departureDate;
	document.querySelector('.js-destination-image').src = imageUrl;
}

export function handleError(error) {
	alert('There was an error processing this request.', error);
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
		alert('Your departure date cannot be in the past!');
		//throw new Error('Departure date in the past!');
	}
	return days;
}

// asynchronous function to reset the form (also hides the loader)
export async function resetForm(formToReset) {
	await wait();
	// hides the loader
	hideLoader();
	formToReset.reset();
}

function showLoader() {
	loader.classList.remove('hidden');
}

function hideLoader() {
	loader.classList.add('hidden');
}
