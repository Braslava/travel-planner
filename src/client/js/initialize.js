import { handleSubmit } from './handlers';
import { form, upcomingTripDisplay } from './elements';
import { removeTrip } from './handlers';
import {
	restoreFromLocalStorage,
	mirrorToLocalStorage,
	createTripCard,
} from './lib';

// create an array to hold the state of the app
export const trips = [];

export function initializeApp() {
	restoreFromLocalStorage(trips);
	form.addEventListener('submit', handleSubmit);
	upcomingTripDisplay.addEventListener('click', (e) => removeTrip(e, trips));
	upcomingTripDisplay.addEventListener('tripsUpdated', (trips) => {
		console.log(trips);
		upcomingTripDisplay.innerHTML = trips
			.map((trip) => createTripCard(trip))
			.join('');
	});
	upcomingTripDisplay.addEventListener('tripsUpdated', mirrorToLocalStorage);
}
