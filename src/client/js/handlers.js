import { postData, updateResults, resetForm } from './lib';
import { form } from './elements';
import { handleError } from './lib';

export async function handleSubmit(event) {
	event.preventDefault();
	// select the url from the input field
	let newsUrl = document.querySelector('#news-url').value.trim();
	// validate the user input
	if (!newsUrl) {
		alert('Please enter a link in the input box!');
		return;
	}

	console.log(newsUrl);
	console.log('::: Form Submitted :::');
	// send the link from the user input to the server via a post request
	// make sure to use absolute path when working in development mode because the dev server runs on a different port
	postData('http://localhost:5000/analyze', { url: newsUrl })
	//postData('/analyze', { url: newsUrl })
		// update the results using the response data
		.then((data) => updateResults(data))
		// control for errrors
		.catch((error) => handleError(error))
		// reset the form
		.then(() => resetForm(form));
}
