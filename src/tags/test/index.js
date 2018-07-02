import test from 'ava';
import props from '../props';

const element = '<tags-clab>';

test(`${element} properties: types & default values`, t => {
  t.is(props.label.type, String);

  t.is(props.name.type, String);
  t.is(props.name.value, 'tags input');

  t.is(props.inputString.type, String);

  t.is(props.type.type, String);
  t.is(props.type.value, '');

  t.is(props.noteType.type, String);

  t.is(props.disabled.type, Boolean);
  t.false(props.disabled.value);

  t.is(props.placeholder.type, String);

  t.is(props.stacked.type, Boolean);
  t.false(props.stacked.value);

  t.is(props.tags.type, Array);
  t.deepEqual(props.tags.value, []);
  t.true(props.tags.notify);
  t.is(props.tags.value.length, 0);

  t.is(props.btnLabel.type, String);
  t.is(props.btnLabel.value, 'Add');

  t.is(props.btnAppearence.type, String);

  t.is(props.btnSize.type, String);

  t.is(props.btnIcon.type, String);

  t.is(props.hideInput.type, Boolean);
  t.false(props.hideInput.value);
});
