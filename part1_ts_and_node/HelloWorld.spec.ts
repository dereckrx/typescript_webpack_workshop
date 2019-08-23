import hello from './HelloWorld3'

describe('HelloWorld', () => {
	it('returns a string', () => {
		expect(hello(3)).toEqual('hello world 3');
	});
});