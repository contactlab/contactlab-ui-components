import test from 'ava';
import props from '../props';
import { _computeRangeWrapperClasses, _compDisabled } from '../methods/internal';

const element = '<range-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.label.type, String);
  t.is(props.label.value, undefined);

  t.is(props.name.type, String);
  t.is(props.name.value, 'rangeinput');

  t.is(props.value.type, Number);
  t.is(props.value.value, undefined);
  t.is(props.value.notify, true);
  t.is(props.value.reflectToAttribute, true);

  t.is(props.min.type, Number);
  t.is(props.min.value, 0);

  t.is(props.max.type, Number);
  t.is(props.max.value, 10);

  t.is(props.step.type, Number);
  t.is(props.step.value, 1);

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);

  t.is(props.showDetails.type, Boolean);
  t.is(props.showDetails.value, false);
});

test(`${element} _compDisabled`, t => {
  t.is(_compDisabled(), null);
  t.is(_compDisabled(true), 'disabled');
});

test(`${element} _computeRangeWrapperClasses`, t => {
  t.is(_computeRangeWrapperClasses(), 'range-wrapper');
  t.is(_computeRangeWrapperClasses(true), 'range-wrapper details');
});
