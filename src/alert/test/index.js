import test from 'ava';

import props from '../props';

const element = '<alert-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.title.type, String);
  t.is(props.title.value, 'Title');

  t.is(props.type.type, String);
  t.is(props.type.value, 'info');

  t.is(props.visible.type, Boolean);
  t.is(props.visible.value, false);
  t.is(props.visible.notify, true);
  t.is(props.visible.observer, '_animateShowHide');

  t.is(props.primary.type, String);
  t.is(props.primary.value, 'Confirm');

  t.is(props.secondary.type, String);
  t.is(props.secondary.value, 'Cancel');

  t.is(props.notify.type, Boolean);
  t.is(props.notify.value, false);

  t.is(props.noAnimation.type, Boolean);
  t.is(props.noAnimation.value, false);
});
