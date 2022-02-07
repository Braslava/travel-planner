/**
 * @jest-environment jsdom
 */
import { postData } from '../src/client/js/lib';

describe('Testing the postData function', () => {
	test('postData function exists', () => {
		expect(postData).toBeDefined();
	});
});
