import add from '../../../../src/utils/add';

describe('Testing test setup using add util', () => {
	it('should add two numbers together', () => {
		expect(add(1,2)).toBe(3);
	});
});
 