'use strict';

export default {
  labels: {
    type: Array,
    value: []
  },
  name: {
    type: String
  },
  wrapperType: {
    type: String,
    value: ''
  },
  active: {
    type: Number,
    value: 0
  },
  disabled: {
    type: Array,
    value: []
  },
  inline: {
    type: Boolean,
    value: false,
    observer: '_computeInline',
    reflectToAttribute: true
  }
}
