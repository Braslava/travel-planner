/**
 * @jest-environment jsdom
 */
import { postData } from '../src/client/js/postData';

describe('Testing the postData function', () => {
	test('postData function exists', () => {
		expect(postData).toBeDefined();
	});
});
