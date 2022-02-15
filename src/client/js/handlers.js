import {
	postData,
	updateTripDisplay,
	resetForm,
	checkHowLongAway,
} from './lib';
import { form } from './elements';
import { handleError } from './lib';

export async function handleSubmit(event) {
	event.preventDefault();
	// select the location from the user input
	const destinationName = form.querySelector('#location').value.trim();
	const utlEncodedDestination = encodeURIComponent(destinationName);
	const startDate = form.querySelector('#departure-date').value.trim();
	const daysUntilTrip = checkHowLongAway(startDate);

	console.log(destinationName, startDate);
	// validate the user input

	console.log('::: Form Submitted :::');
	// make sure to use absolute path when working in development mode because the dev server runs on a different port
	// use '/addtrip' in production mode
	postData('http://localhost:3000/addtrip', {
		location: utlEncodedDestination,
		startDate: startDate,
		daysUntilTrip: daysUntilTrip,
	})
		.then((data) =>
			updateTripDisplay(
				destinationName,
				daysUntilTrip,
				startDate,
				data.destinationImageUrl,
				data.weatherInfo.temperature,
				data.weatherInfo.description
			)
		)
		.catch((error) => handleError(error))
		.then(() => resetForm(form));
}
