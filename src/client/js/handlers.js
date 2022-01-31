import { getAnalysis, updateResults, resetForm } from './lib';
import { form } from './elements';

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
	// get data from the MeaningCloud API
	getAnalysis(newsUrl)
		.then((data) => updateResults(data))
		.then(() => resetForm(form));
}




