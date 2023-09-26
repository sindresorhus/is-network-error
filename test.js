import test from 'ava';
import isNetworkError from './index.js';

test('main', async t => {
	const error = await t.throwsAsync(fetch('https://asdfhsdflasudgfadsjyhgfjashgfaskjh.com'));
	t.true(isNetworkError(error));
});
