import test from 'ava';
import props from '../props';
import { _computeClass, _percent, _computeProp } from '../methods/internal';

const element = '<progress-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.value.type, Number);
  t.is(props.value.value, 0);

  t.is(props.minimal.type, Boolean);
  t.is(props.minimal.value, false);

  t.is(props.type.type, String);
  t.is(props.type.value, null);
});

test(`${element} _computeClass`, t => {
  const str = 'test';
  t.is(_computeClass(), 'progress-bar');
  t.is(_computeClass(true), 'progress-bar minimal');
  t.is(_computeClass(null, str), `progress-bar ${str}`);
  t.is(_computeClass(true, str), `progress-bar minimal ${str}`);
});

test(`${element} _percent`, t => {
  const val = 10;
  t.is(_percent(val), `${val}%`);
});

test(`${element} _computeProp`, t => {
  const val = 25;
  t.is(_computeProp(val), `width:${val}%;`);
});
