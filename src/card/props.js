'use strict';

export default {
  /**
   * Title of the card
   */
  title: String,
  /**
   * Inner text of the primary buttons
   */
  primary: {
    type: String,
    value: 'OK'
  },
  /**
   * Inner text of the secondary buttons
   */
  secondary: {
    type: String,
    value: 'Cancel'
  },
  /**
  * Add an url to the card
    {
      class:'',
      href:'',
      text:''
    }
  */
  link: {
    type: Object,
    value: {}
  },
  /**
   * Add an icon to the card (class)
   */
  icon: String,
  /**
   * Whether the card is big
   */
  big: {
    type: Boolean,
    value: false
  },
  /**
   * Whether the <content> is in table format
   */
  table: {
    type: Boolean,
    value: false
  },
  /**
   * Source of the image
   */
  figure: {
    type: String,
    value: null
  },
  /**
   * Effect to apply on the image
   */
  effect: {
    type: String,
    value: null
  },
  /**
   * Whether the buttons are shown
   */
  noActions: {
    type: Boolean,
    value: false
  }
}
