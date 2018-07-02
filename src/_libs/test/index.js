import test from 'ava';

import { dashify, viewLabel, getIndex } from '../utils';

test(`UTILS dashify`, t => {
  t.is(dashify('string with spaces'), 'string-with-spaces');
});

test(`UTILS viewLabel`, t => {
  t.false(viewLabel());
  t.false(viewLabel(''));
  t.true(viewLabel('label'));
  t.false(viewLabel(undefined, ''));
  t.true(viewLabel(undefined, 'icon'));
  t.false(viewLabel('', ''));
  t.true(viewLabel('label', 'icon'));
});

test(`UTILS getIndex`, t => {
  const arr = ['a', 'b', 'c'];
  t.is(getIndex('a', arr), 0);
  t.is(getIndex('d', arr), -1);
});
