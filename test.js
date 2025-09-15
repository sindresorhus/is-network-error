import test from 'ava';
import isNetworkError from './index.js';

test('main', async t => {
	const error = await t.throwsAsync(fetch('https://asdfhsdflasudgfadsjyhgfjashgfaskjh.com'));
	t.true(isNetworkError(error));
});

test('bun network error', t => {
	// Bun's WebKit network error message
	const bunError = new TypeError(' A network error occurred.');
	t.true(isNetworkError(bunError));
});

test('deno network error', t => {
	const denoError = new TypeError('error sending request for url (http://example.com/): client error (Connect): dns error');
	t.true(isNetworkError(denoError));
});

test('safari network error', t => {
	const safariError = new TypeError('Load failed');
	safariError.stack = undefined;
	t.true(isNetworkError(safariError));
});

test('safari non-network error (has stack)', t => {
	const safariError = new TypeError('Load failed');
	// Ensure it has a stack (which it does by default)
	t.true(typeof safariError.stack === 'string');
	t.false(isNetworkError(safariError));
});

test('standard network error messages', t => {
	const messages = [
		'network error',
		'Failed to fetch',
		'NetworkError when attempting to fetch resource.',
		'The Internet connection appears to be offline.',
		'Network request failed',
		'fetch failed',
		'terminated',
		' A network error occurred.',
	];

	for (const message of messages) {
		const error = new TypeError(message);
		t.true(isNetworkError(error), `Should detect: ${message}`);
	}
});

test('non-network errors', t => {
	t.false(isNetworkError(new Error('Not a network error')));
	t.false(isNetworkError(new TypeError('Not a network error')));
	t.false(isNetworkError(null));
	t.false(isNetworkError(undefined));
	t.false(isNetworkError('string'));

	// Wrong error name
	const wrongNameError = new Error('Failed to fetch');
	wrongNameError.name = 'SomeOtherError';
	t.false(isNetworkError(wrongNameError));
});
