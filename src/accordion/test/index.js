'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';

import props from './../props';

const element = '<accordion-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.title.type, String);
  t.is(props.title.value, 'Title');

  t.is(props.type.type, String);
  t.is(props.type.value, '');

  t.is(props.open.type, Boolean);
  t.false(props.open.value);
  t.is(props.open.observer, '_animateOpenClose');
});


