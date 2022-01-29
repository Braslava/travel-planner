export function handleSubmit(event) {
	event.preventDefault();

	// check what text was put into the form field
	let formText = document.getElementById('news-item').value;
	Client.checkForName(formText);
	const text = `None of it has stopped Russian President Vladimir Putin, though. Moscow has been preparing for this`;
	const base = 'https://api.meaningcloud.com/sentiment-2.1';
	const apiKey = process.env.API_KEY;
	const url = `${base}&key=${apiKey}&lang=en&txt=${text}`;
	console.log('::: Form Submitted :::');
	fetch(url)
		.then((res) => res.json())
		.then(function (res) {
			console.log(res);
			//document.querySelector('.results').innerText = res.message;
		});
}
