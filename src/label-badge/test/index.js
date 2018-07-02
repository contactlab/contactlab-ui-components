import test from 'ava';
import props from '../props';

const element = '<label-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.type.type, String);
  t.is(props.type.value, null);

  t.is(props.counter.type, Number);
  t.is(props.counter.value, null);

  t.is(props.remove.type, Boolean);
  t.is(props.remove.value, false);

  t.is(props.badge.type, Boolean);
  t.is(props.badge.value, false);
});
