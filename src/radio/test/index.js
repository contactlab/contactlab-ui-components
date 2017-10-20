'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<radio-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.labels.type, Array);
  t.deepEqual(props.labels.value, []);
  t.is(props.labels.value.length, 0);

  t.is(props.name.type, String);

  t.is(props.wrapperType.type, String);
  t.is(props.wrapperType.value, '');

  t.is(props.active.type, Number);
  t.is(props.active.value, 0);

  t.is(props.disabled.type, Array);
  t.deepEqual(props.disabled.value, []);
  t.is(props.disabled.value.length, 0);

  t.is(props.inline.type, Boolean);
  t.is(props.inline.value, false);
  t.is(props.inline.observer, '_computeInline');
  t.is(props.inline.reflectToAttribute, true);
});
