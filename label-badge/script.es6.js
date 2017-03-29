'use strict';

import {Polymer} from "./../_assets/js/polymer";

export class LabelClab {

  beforeRegister() {
    this.is = 'label-clab';
    this.properties = {
      type: {
        type: String,
        value: null
      },
      counter: {
        type: Number,
        value: null
      },
      remove: {
        type: Boolean,
        value: false
      },
      badge: {
        type: Boolean,
        value: false
      }
    }
  }


  /*----------
  EVENT HANDLERS
  ----------*/
  _removeClicked(evt) {
    this.dispatchEvent(new CustomEvent('remove',{
      bubbles: true,
      composed: true
    }));
  }


  /*----------
  COMPUTE
  ----------*/
  _computeClass(badge, type) {
    let arr = [badge ? 'badge' : 'label'];
    if(type != null) arr.push(type);
    return arr.join(' ');
  }

}

Polymer(LabelClab);
