'use strict';

export default {
  visible: {
    type: Boolean,
    value: false
  },
  big: {
    type: Boolean,
    value: false
  },
  dark: {
    type: Boolean,
    value: false
  },
  background: {
    type: String,
    reflectToAttribute: true,
    value: '240, 240, 240, 0.9'
  },
  small: {
    type: Boolean,
    value: false
  },
  position: {
    type: String,
    reflectToAttribute: true,
    value: 'absolute'
  },
  color: {
    type: String,
    reflectToAttribute: true,
    value: '101, 109, 120, 0.9'
  }
};
