import { postData } from '../src/client/js/lib';

describe('Testing the postData function', () => {
	test('postData function exists', () => {
		expect(postData).toBeDefined();
	});

	// test('User fetched news analysis should have an agreement score', () => {
	// 	// verifies that a certain number of assertions are called
	// 	const url =
	// 		'https://www.politico.eu/article/nato-membership-defense-ukraine-turkey-poland-uk/';

	// 	// expect.assertions(1);
	// 	return postData('http://localhost:5000/analyze', { url }).then(
	// 		(data) => {
	// 			expect(data.agreement).toEqual('DISAGREEMENT');
	// 		}
	// 	);
	// });
});
