'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<tooltip-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.type.type, String);
  t.is(props.type.value, '');

  t.is(props.visible.type, Boolean);
  t.false(props.visible.value);
  t.is(props.visible.observer, '_observVisibility');

  t.is(props.wait.type, Number);
  t.is(props.wait.value, 500);
});
