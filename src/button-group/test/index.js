'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';

import props from './../props';
// import { _computeClass, _computeBgColor } from './../methods/internal';

const element = '<group-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.type.type, String);
  t.is(props.type.value, '');

  t.is(props.size.type, String);
  t.is(props.size.value, '');

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);
  t.is(props.disabled.observer, '_updateDisabled');

  t.is(props.value.type, Number);
  t.is(props.value.value, 0);
  t.is(props.value.observer, '_updateAppearance');
  t.is(props.value.reflectToAttribute, true);
});

