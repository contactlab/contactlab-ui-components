import test from 'ava';
import props from '../props';

const element = '<modal-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.title.type, String);
  t.is(props.title.value, 'Modal title');

  t.is(props.visible.type, Boolean);
  t.is(props.visible.value, false);
  t.is(props.visible.observer, '_animateShowHide');

  t.is(props.primary.type, String);
  t.is(props.primary.value, null);

  t.is(props.secondary.type, String);
  t.is(props.secondary.value, null);

  t.is(props.warning.type, String);
  t.is(props.warning.value, null);

  t.is(props.primaryDisabled.type, Boolean);
  t.is(props.primaryDisabled.value, false);

  t.is(props.content.type, String);
  t.is(props.content.value, null);

  t.is(props.stopClose.type, Boolean);
  t.is(props.stopClose.value, false);

  t.is(props.noAnimation.type, Boolean);
  t.is(props.noAnimation.value, false);

  t.is(props.noActions.type, Boolean);
  t.is(props.noActions.value, false);
});
