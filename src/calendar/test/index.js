import { window } from './../../../test/helpers/dom';

import test from 'ava';
import props from '../props';
import { getLocale } from '../methods/public';
import { _computeType, _getLocale, _getFormat } from '../methods/internal';
import rome from 'rome';

const element = '<calendar-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.label.type, String);

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);

  t.is(props.valueStr.type, String);
  t.is(props.valueStr.value, null);
  t.is(props.valueStr.notify, true);

  t.is(props.inline.type, Boolean);
  t.is(props.inline.value, false);

  t.is(props.options.type, Object);
  t.deepEqual(props.options.value, {});

  t.is(props.required.type, Boolean);
  t.is(props.required.value, false);
  t.is(props.required.reflectToAttribute, true);

  t.is(props.placeholder.type, String);

  t.is(props.type.type, String);

  t.is(props.noteType.type, String);
});

test(`${element} getLocale`, t => {
  t.is(getLocale(), 'en');
});

test(`${element} _computeType`, t => {
  t.is(_computeType(), ' ');
  t.is(_computeType('first'), 'first ');
  t.is(_computeType(null, 'second'), ' second');
  t.is(_computeType('first', 'second'), 'first second');
});

test(`${element} _getLocale`, t => {
  const noOptions = {};
  const options = { locale: 'it' };

  t.is(_getLocale(noOptions), 'en');
  t.is(_getLocale(options), 'it');
});

test(`${element} _getFormat`, t => {
  const instance = {
    options: () => {
      return { inputFormat: 'en' }
    }
  };
  const noOptions = {};
  const options = { inputFormat: 'it' };

  t.is(_getFormat(noOptions, instance), 'en');
  t.is(_getFormat(options, instance), 'it');
});


