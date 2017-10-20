'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<input-clab>';

const pswd = {
  show: {
    icon: '',
    label: 'Show',
    type: "",
    appearance: "",
    size: ""
  },
  hide: {
    icon: '',
    label: 'Hide',
    type: "",
    appearance: "",
    size: ""
  }
}

test(`${element} properties: types & default values`, t => {
  t.is(props.label.type, String);
  t.is(props.label.value, null);
  t.is(props.label.reflectToAttribute, true);

  t.is(props.icon.type, String);
  t.is(props.icon.value, null);
  t.is(props.icon.reflectToAttribute, true);

  t.is(props.name.type, String);
  t.is(props.name.value, 'textinput');
  t.is(props.name.reflectToAttribute, true);

  t.is(props.inputType.type, String);
  t.is(props.inputType.value, null);
  t.is(props.inputType.reflectToAttribute, true);

  t.is(props.type.type, String);
  t.is(props.type.value, null);
  t.is(props.type.reflectToAttribute, true);

  t.is(props.noteType.type, String);

  t.is(props.value.type, String);
  t.is(props.value.notify, true);
  t.is(props.value.reflectToAttribute, true);

  t.is(props.disabled.type, Boolean);
  t.is(props.disabled.value, false);
  t.is(props.disabled.observer, '_disabledChanged');
  t.is(props.disabled.reflectToAttribute, true);

  t.is(props.inline.type, Boolean);
  t.is(props.inline.value, false);
  t.is(props.inline.reflectToAttribute, true);

  t.is(props.readonly.type, Boolean);
  t.is(props.readonly.value, false);
  t.is(props.readonly.reflectToAttribute, true);

  t.is(props.labelSize.type, String);
  t.is(props.labelSize.value, null);

  t.is(props.placeholder.type, String);
  t.is(props.placeholder.reflectToAttribute, true);

  t.is(props.check.type, Boolean);
  t.is(props.check.value, false);

  t.is(props.required.type, Boolean);
  t.is(props.required.value, false);
  t.is(props.required.reflectToAttribute, true);

  t.is(props.maxlength.type, Number);
  t.is(props.maxlength.value, null);
  t.is(props.maxlength.reflectToAttribute, true);

  t.is(props.btnPswd.type, Object);
  t.deepEqual(props.btnPswd.value, pswd);

  t.is(props._btnPswd.type, Object);

  t.is(props.password.type, Boolean);
  t.is(props.password.value, false);
  t.is(props.password.observer, '_computeBtnPswd');
});
