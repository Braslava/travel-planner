const getDataFromGeoNames = require('../src/server/app');

describe('Testing the getDataFromGeoNames function', () => {
	test('getDataFromGeoNames function exists', () => {
		expect(getDataFromGeoNames).toBeDefined();
	});
});
