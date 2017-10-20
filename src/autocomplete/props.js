'use strict';

export default {
  label: {
    type: String,
    value: null
  },
  name: {
    type: String,
    value: 'auto complete'
  },
  type: {
    type: String
  },
  noteType: {
    type: String
  },
  selected: {
    type: Object,
    value: {},
    observer: '_changedSelected'
  },
  valueField: {
    type: String,
    value: 'value'
  },
  labelField: {
    type: String,
    value: 'label'
  },
  placeholder: {
    type: String,
    value: 'Type...'
  },
  disabled: {
    type: Boolean,
    value: false
  },
  options: {
    type: Array
  },
  url: {
    type: String
  },
  results: {
    type: Array,
    value: [],
    notify: true
  },
  optionsFn: {
    type: Function,
    observer: '_setOptions'
  },
  filter: {
    type: Boolean,
    value: false
  },
  hideHints: {
    type: Boolean,
    value: false
  },
  resultAsObj: {
    type: Boolean,
    value: false
  },
  minChar: {
    type: Number,
    value: 3
  },
  maxInView: {
    type: Number,
    value: 6
  },
  inline: {
    type: Boolean,
    value: false
  },
  labelSize: {
    type: String,
    observer: '_setLabelSize'
  },
  icon: {
    type: String
  },

  /*----------
    PRIVATE
  ----------*/
  _inputString: {
    type: String,
    readonly: true
  },
  _currentHint: {
    type: Object
  },
  _spinner: {
    type: Boolean,
    value: false
  },
  _interval: {
    type: Object
  }
}
