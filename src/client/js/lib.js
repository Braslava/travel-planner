export function checkForName(inputText) {
	console.log('::: Running checkForName :::', inputText);
	let names = ['Picard', 'Janeway', 'Kirk', 'Archer', 'Georgiou'];

	if (names.includes(inputText)) {
		alert('Welcome, Captain!');
	}
}

export function updateResults(polarity, agreement, confidence, irony, subjectivity) {
	const polarityScore = document.querySelector('#polarity');
	const agreementScore = document.querySelector('#agreement');
	const confidenceScore = document.querySelector('#confidence');
	const ironyScore = document.querySelector('#irony');
	const subjectivityScore = document.querySelector('#subjectivity');

	polarityScore.innerText = polarity;
	agreementScore.innerText = agreement;
	confidenceScore.innerText = confidence;
	ironyScore.innerText = irony;
	subjectivityScore.innerText = subjectivity;
}
