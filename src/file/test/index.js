'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<file-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.label.type, String);

  t.is(props.name.type, String);
  t.is(props.name.value, 'fileinput');

  t.is(props.type.type, String);
  t.is(props.type.value, null);

  t.is(props.noteType.type, String);

  t.is(props.value.type, String);
  t.is(props.value.value, null);
  t.is(props.value.notify, true);

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);
  t.is(props.disabled.notify, true);
  t.is(props.disabled.reflectToAttribute, true);
  t.is(props.disabled.observer, '_disabledChanged');

  t.is(props.multiple.type, Boolean);
  t.is(props.multiple.value, false);

  t.is(props.noPreview.type, Boolean);
  t.is(props.noPreview.value, false);
});
