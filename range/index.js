'use strict';

import "./view.html";
import {UtilBehavior} from "./../_behaviors/behaviors.es6";

class RangeClab extends Polymer.mixinBehaviors([UtilBehavior], Polymer.Element)  {
        
  static get is() { return 'range-clab'; }

  static get properties() {
    return {
      label: String,
      name: {
        type: String,
        value: 'rangeinput'
      },
      type: {
        type: String,
        value: null
      },
      value: {
        type: Number,
        notify: true,
        reflectToAttribute: true
      },
      min: Number,
      max: Number,
      step: Number,
      disabled: {
        type: Boolean,
        value: false,
        observer: 'disabledChanged'
      },
      showDetails: {
        type: Boolean,
        value: false
      },

      rangeWrapperClasses: {
        type: String,
        computed: 'computeRangeWrapperClasses(showDetails)'
      }
    }
  }



  /*----------
  EVENT HANDLERS
  ----------*/
  _updateCompValue(evt) {
    this.value = this.querySelector('input').value;
  }



  /*----------
  OBSERVERS
  ----------*/
  disabledChanged(newVal, oldVal) {
    if(newVal) this.type = 'disabled';
  }



  /*----------
  COMPUTED
  ----------*/
  computeRangeWrapperClasses(show) {
    let name;
    if(show) name = 'details';
    return ['range-wrapper', name].join(' ');
  }

}


customElements.define(RangeClab.is, RangeClab);
