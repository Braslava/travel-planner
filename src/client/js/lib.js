import { wait } from './helpers';
import { loader } from './elements';
import { upcomingTripDisplay } from './elements';
import { removeTrip } from './handlers';
// imports the DOMpurify library
import DOMPurify from 'dompurify';

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

export async function updateTripDisplay(
	destination,
	country,
	daysUntilTrip,
	departureDate,
	imageUrl,
	temperature,
	weatherDescription
) {
	const tripHtml = `
	<div class="trip-card">
		<img class="js-destination-image" src="${imageUrl}" alt="destination photo">
		<div class="trip-details">
			<h2 class="heading2">Upcoming trip to <span class="js-location-display">${destination}, ${country}</span>
			</h2>
			<p class="leave-date">Departure: <span class="js-dep-date-display">${departureDate}</span>
			<p>
			<p class="departure-countdown js-departure-countdown">${daysUntilTrip} days left until your trip to ${destination}!
			<p>
			<p class="subheading">Weather forecast for the time of your stay:</p>
			<p class="js-weather-display">${weatherDescription} and ${temperature} degress</p>
			<button class="button button--secondary js-remove-button">Remove trip</button>
		</div>
	</div>
	`;

	const sanitizedTripHtml = DOMPurify.sanitize(tripHtml);
	const htmlFragment = document
		.createRange()
		.createContextualFragment(sanitizedTripHtml);

	upcomingTripDisplay.appendChild(htmlFragment);

	const removeTripButton = document.querySelector('.js-remove-button');
	removeTripButton.addEventListener('click', removeTrip);
}

// export async function updateTripDisplay(
// 	destination,
// 	country,
// 	daysUntilTrip,
// 	departureDate,
// 	imageUrl,
// 	temperature,
// 	weatherDescription
// ) {
// 	// select the results display elements and set their content to the received data
// 	document.querySelector(
// 		'.js-departure-countdown'
// 	).innerText = `${daysUntilTrip} days left until your trip to ${destination}!`;
// 	document.querySelector(
// 		'.js-weather-display'
// 	).innerText = `${weatherDescription} and ${temperature} degress`;
// 	document.querySelector(
// 		'.js-location-display'
// 	).innerText = `${destination}, ${country}`;
// 	document.querySelector('.js-dep-date-display').innerText = departureDate;
// 	document.querySelector('.js-destination-image').src = imageUrl;
// }
