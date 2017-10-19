'use strict';

export default {
  id: String,
  options: {
    type: Array,
    value: []
  },
  highlighted: {
    type: Object,
    value: {}
  },
  labelField: String,
  valueField: String,
  dontHide: {
    type: Boolean,
    notify: true
  },
  maxInView: Number,
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
  _listMaxHeight: String,
  _listHeight: String,
  _hidden: {
    type: Boolean,
    value: false
  },
  _computedStyles: String
}
