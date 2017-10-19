'use strict';

export default {
  label: String,
  name: {
    type: String,
    value: 'tags input'
  },
  inputString: String,
  type: {
    type: String,
    value: ''
  },
  noteType: {
    type: String
  },
  disabled: {
    type: Boolean,
    value: false
  },
  placeholder: String,
  stacked: {
    type: Boolean,
    value: false
  },
  tags: {
    type: Array,
    value: [],
    notify: true
  },
  btnLabel: {
    type: String,
    value: 'Add'
  },
  btnAppearence: String,
  btnSize: String,
  btnIcon: String,
  hideInput: {
    type: Boolean,
    value: false
  }
}
