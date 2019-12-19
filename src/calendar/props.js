export default {
  label: {
    type: String
  },
  disabled: {
    type: Boolean,
    value: false
  },
  valueStr: {
    type: String,
    value: null,
    notify: true
  },
  inline: {
    type: Boolean,
    value: false
  },
  options: {
    type: Object,
    value: {}
  },
  required: {
    type: Boolean,
    value: false,
    reflectToAttribute: true
  },
  placeholder: {
    type: String
  },
  type: {
    type: String
  },
  noteType: {
    type: String
  }
};
