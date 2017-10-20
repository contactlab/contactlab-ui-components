'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<multiple-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.label.type, String);
  t.is(props.label.value, null);

  t.is(props.type.type, String);
  t.is(props.type.value, '');

  t.is(props.options.type, Array);
  t.deepEqual(props.options.value, []);
  t.is(props.options.value.length, 0);

  t.is(props.optionsFn.type, Function);
  t.is(props.optionsFn.observer, '_setOptions');

  t.is(props.url.type, String);

  t.is(props.selected.type, Array);
  t.deepEqual(props.selected.value, []);
  t.is(props.selected.notify, true);
  t.is(props.selected.value.length, 0);

  t.is(props.name.type, String);
  t.is(props.name.value, 'multiple select');

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);
  t.is(props.disabled.observer, '_disabledChanged');

  t.is(props.maxInView.type, Number);
  t.is(props.maxInView.value, 6);

  t.is(props.spinner.type, Boolean);
  t.is(props.spinner.value, false);

  t.is(props.noteType.type, String);
});
