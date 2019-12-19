export default {
  title: {
    type: String,
    value: 'Title'
  },
  type: {
    type: String,
    value: 'info'
  },
  visible: {
    type: Boolean,
    value: false,
    notify: true,
    observer: '_animateShowHide'
  },
  primary: {
    type: String,
    value: 'Confirm'
  },
  secondary: {
    type: String,
    value: 'Cancel'
  },
  notify: {
    type: Boolean,
    value: false
  },
  fixed: {
    type: Boolean,
    value: false
  },
  noAnimation: {
    type: Boolean,
    value: false
  }
};
