import { handleSubmit } from './handlers';
import { form, upcomingTripDisplay } from './elements';
import { removeTrip } from './handlers';
import { restoreFromLocalStorage } from './lib';

// create an array to hold the state of the app
export const trips = [];

export function initializeApp() {
	form.addEventListener('submit', handleSubmit);
	upcomingTripDisplay.addEventListener('click', (e) => removeTrip(e, trips));
	restoreFromLocalStorage(trips);
}
