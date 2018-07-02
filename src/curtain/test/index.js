import test from 'ava';
import props from '../props';

const element = '<curtain-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.id.type, String);

  t.is(props.options.type, Array);
  t.deepEqual(props.options.value, []);
  t.is(props.options.value.length, 0);

  t.is(props.highlighted.type, Object);
  t.deepEqual(props.highlighted.value, {});

  t.is(props.labelField.type, String);

  t.is(props.valueField.type, String);

  t.is(props.dontHide.type, Boolean);
  t.is(props.dontHide.notify, true);

  t.is(props.maxInView.type, Number);

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);

  t.is(props.open.type, Boolean);
  t.is(props.open.value, false);

  t.is(props.maxHeight.type, Number);
  t.is(props.maxHeight.value, 28);

  t.is(props._listMaxHeight.type, String);

  t.is(props._listHeight.type, String);

  t.is(props._hidden.type, Boolean);
  t.is(props._hidden.value, false);

  t.is(props._computedStyles.type, String);
});
