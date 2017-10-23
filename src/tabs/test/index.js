'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<tabs-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.labels.type, Array);
  t.deepEqual(props.labels.value, []);
  t.is(props.labels.value.length, 0);

  t.is(props.pills.type, Boolean);
  t.false(props.pills.value);

  t.is(props.vertical.type, Boolean);
  t.false(props.vertical.value);

  t.is(props.centered.type, Boolean);
  t.false(props.centered.value);

  t.is(props.fullWidth.type, Boolean);
  t.false(props.fullWidth.value);

  t.is(props.active.type, Number);
  t.is(props.active.value, 0);
  t.true(props.active.notify);

  t.is(props.current.type, String);
  t.true(props.current.notify);
});
