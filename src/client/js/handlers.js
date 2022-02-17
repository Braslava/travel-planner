import { createTripCard, resetForm, createTripData } from './lib';
import { form } from './elements';
import { handleError } from './lib';
import { trips } from './initialize';

export async function handleSubmit(event) {
	event.preventDefault();
	console.log('::: Form Submitted :::');
	const destinationName = form.querySelector('#location').value.trim();
	const startDate = form.querySelector('#departure-date').value;
	//ToDo validate user input
	//if (!destinationName || !startDate) return;
	console.log(destinationName, startDate);
	// make sure to use absolute path in postData when working in development mode because the dev server runs on a different port
	// use '/addtrip' in production mode
	createTripData(destinationName, startDate)
		.then((trip) => createTripCard(trip))
		.catch((error) => handleError(error))
		.then(() => resetForm(form));
}

export function removeTrip(e) {
	// delete the trip form UI
	console.log(e.target);
	console.log(e.currentTarget);
	if (!e.target.matches('.js-remove-button')) return;
	e.target.closest('.trip-card').remove();
	// find the trip and delete it from the trips array
	console.log(parseInt(e.target.value));
	console.log(trips);
	const tripToDelete = trips.filter((trip) => {
		trip.id !== parseInt(e.target.value);
	});
	trips.forEach((trip) => console.log(trip.id));
	console.log(tripToDelete);

}
