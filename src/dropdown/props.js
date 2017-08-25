'use strict';

export default {
  label: {
    type: String,
    value: null
  },
  icon: {
    type: String,
    value: ''
  },
  type: {
    type: String,
    value: ''
  },
  noteType: {
    type: String
  },
  selected: {
    type: Object,
    value: {}
  },
  highlighted: Object,
  valueField: {
    type: String,
    value: 'value'
  },
  labelField: {
    type: String,
    value: 'label'
  },
  options: {
    type: Array,
    value: [
      {
        value: 'A',
        label: 'Option 1'
      },
      {
        value: 'B',
        label: 'Option 2'
      }
    ],
    observer: '_updateList'
  },
  optionsList: {
    type: Array,
    value: []
  },
  optionsFn: {
    type: Function,
    observer: '_setOptions'
  },
  url: {
    type: String,
    observer: '_observUrl'
  },
  inline: {
    type: Boolean,
    value: false
  },
  open: {
    type: Boolean,
    value: false
  },
  labelSize: {
    type: String,
    value: ''
  },
  placeholder: {
    type: String,
    value: 'Select..'
  },
  disabled: {
    type: Boolean,
    value: false
  },
  preventChange: {
    type: Boolean,
    value: false
  },
  resultAsObj: {
    type: Boolean,
    value: false
  },
  maxInView: {
    type: Number,
    value: 4
  },
  maxHeight: {
    type: Number,
    value: 28
  },
  search: {
    type: Boolean,
    value: false
  },
  searchValue: {
    type: String,
    value: ''
  },
  /*_liHeight:{
    type:String,
    value:null,
    readonly: true
  }*/
}
