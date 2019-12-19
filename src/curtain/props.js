export default {
  id: {
    type: String
  },
  options: {
    type: Array,
    value: []
  },
  highlighted: {
    type: Object,
    value: {}
  },
  labelField: {
    type: String
  },
  valueField: {
    type: String
  },
  dontHide: {
    type: Boolean,
    notify: true
  },
  maxInView: {
    type: Number
  },
  disabled: {
    type: Boolean,
    value: false
  },
  open: {
    type: Boolean,
    value: false
  },
  //_liHeight:Number,
  maxHeight: {
    type: Number,
    value: 28
  },
  _listMaxHeight: {
    type: String
  },
  _listHeight: {
    type: String
  },
  _hidden: {
    type: Boolean,
    value: false
  },
  _computedStyles: {
    type: String
  }
};
