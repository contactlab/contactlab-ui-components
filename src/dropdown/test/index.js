'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

import { isNil, isNilOrEmptyStr, randomId, propLowerCase } from './../libs';

const element = '<dropdown-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.id.type, String);

  t.is(props.label.type, String);
  t.is(props.label.value, null);

  t.is(props.icon.type, String);
  t.is(props.icon.value, '');

  t.is(props.type.type, String);
  t.is(props.type.value, '');

  t.is(props.noteType.type, String);

  t.is(props.selected.type, Object);
  t.is(props.selected.value, null);

  t.is(props.selectedLabel.type, String);
  t.is(props.selectedLabel.value, null);
  t.is(props.selectedLabel.computed, '_compSelectedLabel(selected, labelField)');

  t.is(props.highlighted.type, Object);

  t.is(props.valueField.type, String);
  t.is(props.valueField.value, 'value');

  t.is(props.labelField.type, String);
  t.is(props.labelField.value, 'label');

  t.is(props.options.type, Array);
  t.deepEqual(props.options.value, [{
      label: '-',
      value: null
    }]);
  t.is(props.options.value.length, 1);

  t.is(props._optionsVisible.type, Array);
  t.deepEqual(props._optionsVisible.value, []);
  t.is(props._optionsVisible.computed, '_updateVisibleOptions(options, searchValue, labelField)');
  t.is(props._optionsVisible.value.length, 0);

  t.is(props.optionsFn.type, Function);

  t.is(props.url.type, String);

  t.is(props.inline.type, Boolean);
  t.is(props.inline.value, false);

  t.is(props.open.type, Boolean);
  t.is(props.open.value, false);

  t.is(props.labelSize.type, String);
  t.is(props.labelSize.value, '');

  t.is(props.placeholder.type, String);
  t.is(props.placeholder.value, 'Select...');

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);

  t.is(props.preventChange.type, Boolean);
  t.is(props.preventChange.value, false);

  t.is(props.resultAsObj.type, Boolean);
  t.is(props.resultAsObj.value, false);

  t.is(props.maxInView.type, Number);
  t.is(props.maxInView.value, 4);

  t.is(props.maxHeight.type, Number);
  t.is(props.maxHeight.value, 28);

  t.is(props.search.type, Boolean);
  t.is(props.search.value, false);

  t.is(props.searchValue.type, String);
  t.is(props.searchValue.value, null);

  t.is(props._toggleList.type, Function);
  t.is(props._toggleList.computed, '_compToggleList(disabled, id)');
});


test(`${element} isNil`, t => {
  t.is( isNil(null), true);
  t.is( isNil(undefined), true);
  t.is( isNil('value'), false);
});

test(`${element} isNilOrEmptyStr`, t => {
  t.is(isNilOrEmptyStr(null), true);
  t.is(isNilOrEmptyStr(undefined), true);
  t.is(isNilOrEmptyStr(''), true);
  t.is(isNilOrEmptyStr('value'), false);
});

test(`${element} randomId`, t => {
  t.is(typeof randomId(), 'string');
  t.true(randomId().length >= 16);
});

test(`${element} propLowerCase`, t => {
  const obj = { foo: 'BAR' };

  t.is(propLowerCase(), '');
  t.is(propLowerCase(obj, 'test'), '');
  t.is(propLowerCase(obj, 'foo'), 'bar');
});
