import { wait } from './helpers';
import { loader } from './elements';
import { upcomingTripDisplay } from './elements';
import { postData } from './postData';
import { trips } from './initialize';

// imports the DOMpurify library
import DOMPurify from 'dompurify';

// calculate days betwwn current date and start of the trip
export function checkHowLongAway(dateInputValue) {
	const today = new Date();
	// create a date object from the html input value
	const startDate = new Date(dateInputValue);
	// console.log('startdate ' + startDate);
	// convert to ms, subtract and then convert back to days and round up
	const days = Math.ceil(
		(startDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
	);
	if (days < 0) {
		alert('Your departure date cannot be in the past!');
	}
	return days;
}

// function that
export const createTripData = async (destinationName, startDate) => {
	const daysUntilTrip = checkHowLongAway(startDate);
	// use absolute path in postData when working in development mode because the dev server runs on a different port
	// can use '/addtrip' in production mode
	const retrievedTripData = await postData('http://localhost:3000/addtrip', {
		location: encodeURIComponent(destinationName),
		startDate: startDate,
		daysUntilTrip: daysUntilTrip,
	});
	console.log(retrievedTripData);
	const trip = {
		destinationName,
		startDate,
		daysUntilTrip,
		// using the date in ms as unique id
		id: Date.now(),
		country: retrievedTripData.country,
		destinationImageUrl: retrievedTripData.destinationImageUrl,
		weatherInfo: {
			temperature: retrievedTripData.weatherInfo.temperature,
			description: retrievedTripData.weatherInfo.description,
		},
	};
	trips.push(trip);
	console.log('the trip array is:' + trips.length, trips);
	mirrorToLocalStorage(trips);
	return trip;
};

export function handleError(error) {
	alert('There was an error processing this request.', error);
	console.log('error', error);
}

// asynchronous function to reset the form (also hides the loader)
export async function resetForm(formToReset) {
	await wait();
	// hides the loader
	hideLoader();
	formToReset.reset();
}

//show and hide the loader while processing request
export function showLoader() {
	loader.classList.remove('hidden');
}

export function hideLoader() {
	loader.classList.add('hidden');
}

// create the html element displaying trip data
export async function createTripCard(tripData = []) {
	// console.log(tripData);
	const tripHtml = `
	<div class="trip-card">
		<img class="js-destination-image" src="${tripData.destinationImageUrl}" alt="destination photo">
		<div class="trip-details">
			<h2 class="heading2">Upcoming trip to <span class="js-location-display">${tripData.destinationName}, ${tripData.country}</span>
			</h2>
			<p class="leave-date">Departure: <span class="js-dep-date-display">${tripData.startDate}</span>
			<p>
			<p class="departure-countdown js-departure-countdown">${tripData.daysUntilTrip} days left until your trip to ${tripData.destinationName}!
			<p>
			<p class="subheading">Weather forecast for the time of your stay:</p>
			<p class="js-weather-display">${tripData.weatherInfo.description} and ${tripData.weatherInfo.temperature} degress</p>
			<button class="button button--secondary js-remove-button" value="${tripData.id}">Remove trip</button>
		</div>
	</div>
	`;
	// sanitizing the html string to prevent XSS
	const sanitizedTripHtml = DOMPurify.sanitize(tripHtml);
	const htmlFragment = document
		.createRange()
		.createContextualFragment(sanitizedTripHtml);

	upcomingTripDisplay.appendChild(htmlFragment);
}

export function mirrorToLocalStorage(items) {
	console.info('Saving items to localstorage');
	localStorage.setItem('items', JSON.stringify(items));
}

export function restoreFromLocalStorage(items) {
	console.info('Restoring from LS');
	// pull the items from localstorage
	const existingItems = JSON.parse(localStorage.getItem('items'));
	if (existingItems.length) {
		items.push(...existingItems);
		items.map((item) => createTripCard(item));
	}
}
