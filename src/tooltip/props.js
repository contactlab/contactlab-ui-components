'use strict';

export default {
  type: {
    type: String,
    value: ""
  },
  visible: {
    type: Boolean,
    value: false,
    observer: '_observVisibility'
  },
  wait: {
    type: Number,
    value: 500
  }
}
