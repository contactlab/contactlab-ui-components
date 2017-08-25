'use strict';

export default {
  label: String,
  name: {
    type: String,
    value: 'rangeinput'
  },
  type: {
    type: String,
    value: null
  },
  value: {
    type: Number,
    notify: true,
    reflectToAttribute: true
  },
  min: Number,
  max: Number,
  step: Number,
  disabled: {
    type: Boolean,
    value: false,
    observer: 'disabledChanged'
  },
  showDetails: {
    type: Boolean,
    value: false
  },
  rangeWrapperClasses: {
    type: String,
    computed: 'computeRangeWrapperClasses(showDetails)'
  }
}
