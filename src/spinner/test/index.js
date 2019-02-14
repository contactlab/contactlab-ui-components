import test from 'ava';
import props from '../props';

const element = '<spinner-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.visible.type, Boolean);
  t.is(props.visible.value, false);

  t.is(props.small.type, Boolean);
  t.is(props.small.value, false);

  t.is(props.big.type, Boolean);
  t.is(props.big.value, false);

  t.is(props.dark.type, Boolean);
  t.is(props.dark.value, false);

  t.is(props.position.type, String);
  t.is(props.position.value, 'absolute');

  t.is(props.background.type, String);
  t.is(props.background.value, '240, 240, 240, 0.9');

  t.is(props.color.type, String);
  t.is(props.color.value, '101, 109, 120, 0.9');
});
