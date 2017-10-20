'use strict';

export default {
  id: {
    type: String
  },
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
    value: null
  },
  selectedLabel: {
    type: String,
    value: null,
    computed: '_compSelectedLabel(selected, labelField)'
  },
  highlighted: {
    type: Object
  },
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
        label: '-',
        value: null
      }
    ]
  },
  _optionsVisible: {
    type: Array,
    value: [],
    computed: '_updateVisibleOptions(options, searchValue, labelField)'
  },
  optionsFn: {
    type: Function
  },
  url: {
    type: String
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
    value: 'Select...'
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
    value: null
  },
  _toggleList: {
    type: Function,
    computed: '_compToggleList(disabled, id)'
  }
}
