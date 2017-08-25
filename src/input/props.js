'use strict';

export default {
  label: {
    type: String,
    value: null,
    reflectToAttribute: true
  },
  icon: {
    type: String,
    value: null,
    reflectToAttribute: true
  },
  name: {
    type: String,
    value: 'textinput',
    reflectToAttribute: true
  },
  inputType: {
    type: String,
    value: null,
    reflectToAttribute: true
  },
  type: {
    type: String,
    value: null,
    reflectToAttribute: true
  },
  noteType: String,
  value: {
    type: String,
    notify: true,
    reflectToAttribute: true
  },
  disabled: {
    type: Boolean,
    value: false,
    observer: '_disabledChanged',
    reflectToAttribute: true
  },
  inline: {
    type: Boolean,
    value: false,
    reflectToAttribute: true
  },
  readonly: {
    type: Boolean,
    value: false,
    reflectToAttribute: true
  },
  labelSize: {
    type: String,
    value: null
  },
  placeholder: {
    type: String,
    reflectToAttribute: true
  },
  check: {
    type: Boolean,
    value: false
  },
  required: {
    type: Boolean,
    value: false,
    reflectToAttribute: true
  },
  maxlength: {
    type: Number,
    value: null,
    reflectToAttribute: true
  },
  btnPswd: {
    type: Object,
    value: {
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
  },
  _btnPswd: Object,
  password: {
    type: Boolean,
    value: false,
    observer: '_computeBtnPswd'
  }
}
