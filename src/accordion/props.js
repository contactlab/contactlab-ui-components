'use strict';

export default {
  title: {
    type: String,
    value: 'Title'
  },
  type: {
    type: String,
    value: ''
  },
  open: {
    type: Boolean,
    value: false,
    observer: '_animateOpenClose'
  }
}
