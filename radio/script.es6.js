'use strict';

import {Polymer} from "./../_assets/js/polymer";
import {UtilBehavior} from "./../_behaviors/behaviors.es6";

export class RadioClab {

  get behaviors() {
    return [UtilBehavior];
  }

  beforeRegister() {
    this.is = "radio-clab";
    this.properties = {
      labels: Array,
      name: String,
      wrapperType: {
        type: String,
        value: ''
      },
      active: Number,
      disabled: Array
    }
  }



  /*----------
    COMPUTED
  ----------*/
  _computeType(wt) {
    return ['row', wt].join(' ');
  }

  /*----------
    UTILS
  ----------*/
  _isChecked(index, active) {
    return index === active;
  }

  _isDisabled(index, disabledArr) {
    return disabledArr.includes(index)
  }

  /*----------
    LISTENERS
  ----------*/

  _onChange(evt) {
    const clickedIndex = parseInt(evt.target.dataset.index, 10)
    this.set('active', clickedIndex)
  }
}


Polymer(RadioClab);
