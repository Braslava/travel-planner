import { createTripCard, resetForm, createTripData } from './lib';
import { form, upcomingTripDisplay } from './elements';
import { handleError, mirrorToLocalStorage } from './lib';

export async function handleSubmit(event) {
	event.preventDefault();
	console.log('::: Form Submitted :::');
	const destinationName = form.querySelector('#location').value.trim();
	const startDate = form.querySelector('#departure-date').value;
	//ToDo validate user input properly using JS
	//if (!destinationName || !startDate) return;
	console.log(destinationName, startDate);
	try {
		await createTripData(destinationName, startDate);
	} catch (err) {
		handleError(err);
	}

	await resetForm(form);

	// .then((trips) => createTripCards(trips))
	// .catch((error) => handleError(error))
	// .then(() => resetForm(form));
}

export function removeTrip(e, items) {
	// delete the trip form UI
	console.log('DELETING ITEM with ID: ', parseInt(e.target.value));
	if (!e.target.matches('.js-remove-button')) return;
	e.target.closest('.trip-card').remove();
	//find the trip and delete it from the trips data array
	console.log(items.length);

	items = items.filter((trip) => {
		return trip.id !== parseInt(e.target.value);
	});
	// items.map(item => createTripCard(item));
	upcomingTripDisplay.dispatchEvent(new CustomEvent('tripsUpdated'));

	console.log(items.length);
	// mirrorToLocalStorage(items);
}
