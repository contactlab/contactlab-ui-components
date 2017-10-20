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

const link = {
  hasOwnProperty: prop => true
}
const noLink = {
  hasOwnProperty: prop => false
}

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


test(`${element} _computeCardClass`, t => {
  t.is(_computeCardClass(), 'card-title');
  t.is(_computeCardClass(true), 'card-title big-icon');
});

test(`${element} _computeEffectClass`, t => {
  t.is(_computeEffectClass(), 'card ');
  t.is(_computeEffectClass('effect'), 'card effect');
});

test(`${element} _showActions`, t => {
  t.is(_showActions(undefined, noLink), true);
  t.is(_showActions(true, noLink), false);
  t.is(_showActions(undefined, link), false);
  t.is(_showActions(true, link), false);
});

test(`${element} _showLink`, t => {
  t.is(_showLink(undefined, noLink), false);
  t.is(_showLink(true, noLink), false);
  t.is(_showLink(undefined, link), true);
  t.is(_showLink(true, link), false);
});

test(`${element} _showtitle`, t => {
  t.is(_showTitle(), false);
  t.is(_showTitle('text'), true);
});
