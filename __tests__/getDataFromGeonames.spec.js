const getDataFromGeonames = require('../src/server/index');

describe('Testing the postSentimentData function', () => {
	test('postSentimentData function exists and returns something', () => {
		expect(getDataFromGeonames).toBeDefined();
	});
});
