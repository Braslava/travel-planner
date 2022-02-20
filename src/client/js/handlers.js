import { createTripCard, resetForm, createTripData } from './lib';
import { form } from './elements';
import { handleError } from './lib';

export async function handleSubmit(event) {
	event.preventDefault();
	console.log('::: Form Submitted :::');
	const destinationName = form.querySelector('#location').value.trim();
	const startDate = form.querySelector('#departure-date').value;
	//ToDo validate user input properly using JS
	//if (!destinationName || !startDate) return;
	console.log(destinationName, startDate);
	createTripData(destinationName, startDate)
		.then((trip) => createTripCard(trip))
		.catch((error) => handleError(error))
		.then(() => resetForm(form));
}

export function removeTrip(e, tripArray) {
	// delete the trip form UI
	console.log(e.target);
	console.log(e.currentTarget);
	console.log("DELETING ITEM!!! with ID: ", parseInt(e.target.value));
	if (!e.target.matches('.js-remove-button')) return;
	e.target.closest('.trip-card').remove();
	//ToDo find the trip and delete it from the trips array
	console.log(tripArray);
	tripArray = tripArray.filter((trip) => {
		trip.id !== parseInt(e.target.value);
	});
	console.log(tripArray);
}
