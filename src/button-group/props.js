'use strict';

export default {
  options: {
    type: Array,
    value: ['Option 1', 'Option 2']
  },
  /**
  * Additional class
  */
  type: {
    type: String,
    value: ''
  },
  /**
  * `size` additional class for the size of the buttons
  */
  size: {
    type: String,
    value: ''
  },
  /**
  * Whether the buttons are disabled
  */
  disabled: {
    type: Boolean,
    value: false
  },
  /**
  * Index of the button active at init
  */
  value: {
    type: Number,
    value: 0,
    reflectToAttribute: true
  }
}
