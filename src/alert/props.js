'use strict';

export default {
  title: {
    type: String,
    value: 'Title'
  },
  type: {
    type: String,
    value: 'success'
  },
  visible: {
    type: Boolean,
    value: false,
    notify: true,
    observer: '_animateShowHide'
  },
  primary: {
    type: String,
    value: 'Confirm'
  },
  secondary: {
    type: String,
    value: 'Cancel'
  },
  notify: {
    type: Boolean,
    value: false
  },
  noAnimation: {
    type: Boolean,
    value: false
  }
}
