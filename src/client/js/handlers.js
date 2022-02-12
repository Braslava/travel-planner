import { postData, updateResults, resetForm } from './lib';
import { form } from './elements';
import { handleError } from './lib';

export async function handleSubmit(event) {
	event.preventDefault();
	// select the location from the user input
	let destinationName = document.querySelector('#location').value.trim();
	let travelStart = document.querySelector('#departure-date').value.trim();

	console.log(destinationName, travelStart);
	// validate the user input


	console.log('::: Form Submitted :::');
	// send the link from the user input to the server via a post request
	// make sure to use absolute path when working in development mode because the dev server runs on a different port
	postData('http://localhost:5000/addtrip', {
		location: destinationName,
		startDate: travelStart,
	})
		//postData('/addtrip', { location: destinationName, startDate: travelStart, })
		// update the results using the response data
		// .then((data) => updateResults(data))
		// // control for errrors
		// .catch((error) => handleError(error))
		// // reset the form
		// .then(() => resetForm(form));
}
