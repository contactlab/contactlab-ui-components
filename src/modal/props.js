'use strict';

export default {
  title: {
    type: String,
    value: 'Modal title'
  },
  visible: {
    type: Boolean,
    value: false,
    observer: '_animateShowHide'
  },
  primary: {
    type: String,
    value: null
  },
  secondary: {
    type: String,
    value: null
  },
  warning: {
    type: String,
    value: null
  },
  classic: {
    type: Boolean,
    value: false
  },
  primaryDisabled: {
    type: Boolean,
    value: false
  },
  content: {
    type: String,
    value: null
  },
  stopClose: {
    type: Boolean,
    value: false
  },
  width: {
    type: Number,
    value: 840
  },
  noAnimation: {
    type: Boolean,
    value: false
  },
  noActions: {
    type: Boolean,
    value: false
  }
}
