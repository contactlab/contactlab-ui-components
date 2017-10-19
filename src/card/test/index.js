'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';
import {
  _computeCardClass,
  _computeEffectClass,
  _showActions,
  _showLink,
  _showTitle
} from './../methods/internal';

const element = '<card-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.title.type, String);
  t.is(props.title.value, '');

  t.is(props.primary.type, String);
  t.is(props.primary.value, 'OK');

  t.is(props.secondary.type, String);
  t.is(props.secondary.value, 'Cancel');

  t.is(props.link.type, Object);
  t.is(typeof props.link.value, 'object');

  t.is(props.icon.type, String);
  t.is(props.icon.value, undefined);

  t.is(props.big.type, Boolean);
  t.is(props.big.value, false);

  t.is(props.table.type, Boolean);
  t.is(props.table.value, false);

  t.is(props.figure.type, String);
  t.is(props.figure.value, null);

  t.is(props.effect.type, String);
  t.is(props.effect.value, null);

  t.is(props.noActions.type, Boolean);
  t.is(props.noActions.value, false);
});

/* test(`${element} _computeClass`, t => {
  const type = 'type';
  const appearance = 'appearance';
  const size = 'size';
  t.is(_computeClass(), 'btn   ');
  t.is(_computeClass(type), `btn ${type}  `);
  t.is(_computeClass(null, appearance), `btn  ${appearance} `);
  t.is(_computeClass(null, null, size), `btn   ${size}`);
  t.is(_computeClass(null, null, null, true), `btn    block`);
  t.is(_computeClass(type, appearance, size, true), `btn ${type} ${appearance} ${size} block`);
});

test(`${element} _computeIconClass`, t => {
  const str = 'test';
  t.is(_computeIconClass(), 'icon ');
  t.is(_computeIconClass(str), `icon ${str}`);
}); */
