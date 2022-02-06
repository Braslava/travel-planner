const postSentimentData = require('../src/server/index');

describe('Testing the postSentimentData function', () => {
	test('postSentimentData function exists and returns something', () => {
		expect(postSentimentData).toBeDefined();
	});
});
