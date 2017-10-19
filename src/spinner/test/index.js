'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';

import props from './../props';
import { _computeClass, _computeBgColor } from './../methods/internal';

const element = '<spinner-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.dark.type, Boolean);
  t.is(props.dark.value, false);

  t.is(props.big.type, Boolean);
  t.is(props.big.value, false);

  t.is(props.visible.type, Boolean);
  t.is(props.visible.value, false);

  t.is(props.background.type, String);
  t.is(props.background.value, '240, 240, 240, 0.9');
});

test(`${element} _computeClass`, t => {
  t.is(_computeClass(), 'spinner-overlay');
  t.is(_computeClass(true), 'spinner-overlay big');
  t.is(_computeClass(null, true), 'spinner-overlay dark');
  t.is(_computeClass(true, true), 'spinner-overlay dark big');
});

test(`${element} _computeBgColor`, t => {
  const color = '0,0,0,1';
  t.is(_computeBgColor(color), `background-color: rgba(${color})`);
});
