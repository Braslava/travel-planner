import { postData } from '../src/client/js/lib';

// describe('Post data function', () => {
// 	test('it should send user input data to the server', () => {
// 		const input = [
// 			{
// 				id: 1,
// 				url: 'https://www.politico.eu/article/nato-membership-defense-ukraine-turkey-poland-uk/',
// 			},
// 		];
// 		const output = [{}];
// 	});
// });

// expect(postData(input));

describe('Testing the postData function', () => {
	test('It should return  a value that is not undefined', () => {
		expect(postData).toBeDefined();
	});

	// test('Testing the postData() function', () => {
	// 	expect.assertions(1);
	// 	return postData('txt', 'I love you!').then((data) => {
	// 		expect(data.score_tag).toBe('P+');
	// 	});
	// });
});
