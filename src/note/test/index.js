'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<note-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.type.type, String);

  t.is(props.classes.type, String);
  t.is(props.classes.computed, 'computeClasses(type)');
  t.is(props.classes.readonly, true);
});
