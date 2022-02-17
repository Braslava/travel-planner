import { handleSubmit } from './handlers';
import { form, upcomingTripDisplay } from './elements';
import { removeTrip } from './handlers';



// create an array to hold the state of the app
export const trips = [];

export function initializeApp() {
	form.addEventListener('submit', handleSubmit);
	upcomingTripDisplay.addEventListener('click', removeTrip);
}
