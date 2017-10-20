'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';

import props from './../props';
// import { _computeClass, _computeBgColor } from './../methods/internal';

const element = '<autocomplete-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.label.type, String);
  t.is(props.label.value, null);

  t.is(props.name.type, String);
  t.is(props.name.value, 'auto complete');

  t.is(props.type.type, String);

  t.is(props.noteType.type, String);

  t.is(props.selected.type, Object);
  t.deepEqual(props.selected.value, {});
  t.is(props.selected.observer, '_changedSelected');

  t.is(props.valueField.type, String);
  t.is(props.valueField.value, 'value');

  t.is(props.labelField.type, String);
  t.is(props.labelField.value, 'label');

  t.is(props.placeholder.type, String);
  t.is(props.placeholder.value, 'Type...');

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);

  t.is(props.options.type, Array);

  t.is(props.url.type, String);

  t.is(props.results.type, Array);
  t.deepEqual(props.results.value, []);
  t.is(props.results.notify, true);
  t.is(props.results.value.length, 0);

  t.is(props.optionsFn.type, Function);
  t.is(props.optionsFn.observer, '_setOptions');

  t.is(props.filter.type, Boolean);
  t.is(props.filter.value, false);

  t.is(props.hideHints.type, Boolean);
  t.is(props.hideHints.value, false);

  t.is(props.resultAsObj.type, Boolean);
  t.is(props.resultAsObj.value, false);

  t.is(props.minChar.type, Number);
  t.is(props.minChar.value, 3);

  t.is(props.maxInView.type, Number);
  t.is(props.maxInView.value, 6);

  t.is(props.inline.type, Boolean);
  t.is(props.inline.value, false);

  t.is(props.labelSize.type, String);
  t.is(props.labelSize.observer, '_setLabelSize');

  t.is(props.icon.type, String);

  t.is(props._inputString.type, String);
  t.is(props._inputString.readonly, true);

  t.is(props._currentHint.type, Object);

  t.is(props._spinner.type, Boolean);
  t.is(props._spinner.value, false);

  t.is(props._interval.type, Object);
});

