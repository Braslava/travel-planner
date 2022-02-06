/**
 * @jest-environment jsdom
 */
import { handleSubmit } from '../src/client/js/handlers';

describe('Testing the handleSubmit function', () => {
	test('handleSubmit function exists', () => {
		expect(handleSubmit).toBeDefined();
	});
});
