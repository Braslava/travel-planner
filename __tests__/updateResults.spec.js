/**
 * @jest-environment jsdom
 */
import { createTripCard } from '../src/client/js/lib';

describe('Testing the updateReults function', () => {
	test('updateReulsts function exists', () => {
		expect(createTripCard).toBeDefined();
	});

	test('the function creates a div with trip details in the trips section', () => {
		document.body.innerHTML = `
        <div class="results">
                <h2 class="heading2">Results </h2>
                <p>Polarity: <span id="polarity"></span></p>
                <p>Agreement: <span id="agreement"></span></p>
                <p>Confidence: <span id="confidence"></span></p>
                <p>Irony: <span id="irony"></span></p>
                <p>Subjectivity: <span id="subjectivity"></span></p>
            </div>`;
		const input = {
			polarity: 'N',
			agreement: 'DISAGREEMENT',
			subjectivity: 'SUBJECTIVE',
			confidence: '80',
			irony: 'IRONIC',
		};

		updateResults(input);
		expect(document.querySelector('#polarity').innerText).toBe('N');
		expect(document.querySelector('#agreement').innerText).toBe(
			'DISAGREEMENT'
		);
		expect(document.querySelector('#confidence').innerText).toBe('80');
		expect(document.querySelector('#irony').innerText).toBe('IRONIC');
		expect(document.querySelector('#subjectivity').innerText).toBe(
			'SUBJECTIVE'
		);
	});
});
