import { postData, updateResults, resetForm } from './lib';
import { form } from './elements';
import { handleError } from './lib';

export async function handleSubmit(event) {
	event.preventDefault();
	// select the location from the user input
	let destinationName = form.querySelector('#location').value.trim();
	let startDate = form.querySelector('#departure-date').value.trim();

	console.log(destinationName, startDate);
	// validate the user input


	console.log('::: Form Submitted :::');
	// send the link from the user input to the server via a post request
	// make sure to use absolute path when working in development mode because the dev server runs on a different port
	postData('http://localhost:3000/addtrip', {
		location: destinationName,
		startDate: startDate,
	})
		//postData('/addtrip', { location: destinationName, startDate: travelStart, })
		// update the results using the response data
		// .then((data) => updateResults(data))
		// // control for errrors
		// .catch((error) => handleError(error))
		// // reset the form
		// .then(() => resetForm(form));
}
