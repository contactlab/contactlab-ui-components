'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import '@polymer/polymer/lib/elements/dom-if';

class SpinnerClab extends PolymerElement {

  static get is() { return 'spinner-clab'; }

  static get template() { return template; }

  static get properties() { return props; }



  /*----------
  COMPUTED
  ----------*/
  _computeClass(big, dark) {
    let str = 'spinner-overlay ';
    this.dark ? str += ' dark ' : null;
    this.big ? str += ' big ' : null;
    return str;
  }

  _computeBgColor(color) {
    return 'background-color: rgba(' + color + ')';
  }

}

customElements.define(SpinnerClab.is, SpinnerClab);
