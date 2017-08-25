'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';

class ProgressClab extends PolymerElement {

  static get is() { return 'progress-clab'; }

  static get template() { return template; }

  static get properties() {
    return {
      value: {
        type: Number,
        value: 0
      },
      minimal: {
        type: Boolean,
        value: false
      },
      type: {
        type: String,
        value: null
      }
    }
  }



  /*----------
  COMPUTED
  ----------*/
  _computeProp(value) {
    return 'width:' + this.value + '%;';
  }

  _computeClass(minimal, type) {
    let arr = ['progress-bar'];
    if(minimal) arr.push('minimal');
    if(type != null) arr.push(type);
    return arr.join(' ');
  }



  /*----------
  UTILS
  ----------*/
  _percent(value) {
    return value + '%';
  }

}

customElements.define(ProgressClab.is, ProgressClab);
