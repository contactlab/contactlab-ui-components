'use strict';

export default {
  label: {
    type: String
  },
  name: {
    type: String,
    value: 'tags input'
  },
  inputString: {
    type: String
  },
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
  placeholder: {
    type: String
  },
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
  btnAppearence: {
    type: String
  },
  btnSize: {
    type: String
  },
  btnIcon: {
    type: String
  },
  hideInput: {
    type: Boolean,
    value: false
  }
}
