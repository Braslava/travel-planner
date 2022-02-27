/**
 * @jest-environment jsdom
 */
import { createTripCard } from '../src/client/js/lib';

describe('Testing the createTripCard function', () => {
	test('createTripCard function exists', () => {
		expect(createTripCard).toBeDefined();
	});
	//ToDo - fix test for createTripCard
	test('the function creates a div with trip details in the trips section', () => {
		document.body.innerHTML = `
        <section class="trips js-trips"></section>`;
		//const upcomingTripDisplay = document.querySelector('.js-trips')
		const tripData = {
			country: 'Spain',
			daysUntilTrip: 4,
			destinationImageUrl: 'https://pixabay.com/testimage',
			destinationName: 'Ronda',
			id: 1645376844755,
			startDate: '2022-02-24',
			weatherInfo: {
				description: 'Overcast clouds',
				temperature: 11.7,
			},
		};

		// 		expect(document.body.innerHTML).toContainHTML(
		// `<section class="trips js-trips">
		//     <div class="trip-card">
		//         <img alt="destination photo" src="https://pixabay.com/testimage" class="js-destination-image">
		// 		<div class="trip-details">
		// 			<h2 class="heading2">Upcoming trip to <span class="js-location-display">Ronda, Spain</span></h2>
		// 			<p class="leave-date">Departure: <span class="js-dep-date-display">2022-02-24</span></p>
		// 			<p class="departure-countdown js-departure-countdown">4 days left until your trip to Ronda!</p>
		// 			<p class="subheading">Weather forecast for the time of your stay:</p>
		// 			<p class="js-weather-display">Overcast clouds and 11.7 degress</p>
		// 			<button value="1645376844755" class="button button--secondary js-remove-button">Remove trip</button>
		// 		</div>
		//     </div>
		// </section>`
		// );
	});
});
