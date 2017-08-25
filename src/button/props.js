'use strict';

export default {
  /**
   * `type` additional class for the type of btn
   */
  type: {
    type: String,
    value: "",
    reflectToAttribute: true
  },
  /**
   * `appearance` additional class for the type
   */
  appearance: {
    type: String,
    value: ""
  },
  /**
   * `size` additional class for the size
   */
  size: {
    type: String,
    value: ""
  },
  /**
   * `type` insert a valid icon class to add an icon
   */
  icon: {
    type: String,
    value: ""
  },
  /**
   * Whether is disabled or not
   */
  disabled: {
    type: Boolean,
    value: false,
    reflectToAttribute: true
  },
  /**
   * If it use block layout (auto width)
   */
  block: {
    type: Boolean,
    value: false,
    reflectToAttribute: true
  },
  /**
   * Default HTML button type (submit, reset, button)
   */
  buttonType: {
    type: String,
    value: 'button',
  }
}
