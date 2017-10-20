'use strict';

export default {
  label: {
    type: String
  },
  name: {
    type: String,
    value: 'fileinput'
  },
  type: {
    type: String,
    value: null
  },
  noteType: {
    type: String
  },
  value: {
    type: String,
    notify: true,
    value: null
  },
  disabled: {
    type: Boolean,
    value: false,
    notify: true,
    reflectToAttribute: true,
    observer: '_disabledChanged'
  },
  multiple: {
    type: Boolean,
    value: false
  },
  noPreview: {
    type: Boolean,
    value: false
  }
}
