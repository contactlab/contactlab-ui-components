'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<feature-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.link.type, String);
  t.is(props.link.value, null);

  t.is(props.linkTarget.type, String);
  t.is(props.linkTarget.value, '_self');

  t.is(props.iconClass.type, String);
  t.is(props.iconClass.value, null);

  t.is(props.src.type, String);
  t.is(props.src.value, null);

  t.is(props.size.type, String);
  t.is(props.size.value, null);

  t.is(props.vertical.type, Boolean);
  t.is(props.vertical.value, false);
});
