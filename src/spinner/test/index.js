'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<spinner-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.dark.type, Boolean);
  t.is(props.dark.value, false);
});

/* test('bar', async t => {
  const bar = Promise.resolve('bar');

  t.is(await bar, 'bar');
});
 */
