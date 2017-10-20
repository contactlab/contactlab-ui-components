'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<checkbox-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.label.type, String);

  t.is(props.wrapperType.type, String);

  t.is(props.active.type, Boolean);
  t.is(props.active.value, false);
  t.is(props.active.notify, true);

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);
});
