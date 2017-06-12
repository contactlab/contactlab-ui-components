'use strict';

import "./view.html";
import {UtilBehavior} from "./../_behaviors";

class RadioClab extends Polymer.mixinBehaviors([UtilBehavior], Polymer.Element)  {
        
  static get is() { return 'radio-clab'; }

  static get properties() {
    return {
      labels: Array,
      name: String,
      wrapperType: {
        type: String,
        value: ''
      },
      active: Number,
      disabled: Array,
      inline: {
        type: Boolean,
        value: false,
        observer: '_computeInline',
        reflectToAttribute: true
      }
    }
  }



  /*----------
    COMPUTED
  ----------*/
  _computeType(wt) {
    return ['row', wt].join(' ');
  }

  _computeInline(inline){
    inline ? this.classList.add('inline') : this.classList.remove('inline');
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


customElements.define(RadioClab.is, RadioClab);
