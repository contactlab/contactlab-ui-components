'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';

class ButtonClab extends PolymerElement {

  static get is() { return 'button-clab'; }

  static get template() { return template; }

  static get properties() { return props }

  _click(evt) {
    this.dispatchEvent(new CustomEvent('btnclick',{
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Computes the class of the button joining the values of 'type', 'appearence' and 'size'
   */
  _computeClass(type, appearance, size, block) {
    const arr = ['btn', type, appearance, size];
    block ? arr.push('block') : null;
    return arr.join(' ');
  }

  /**
   * Computes the class of the icon if 'icon' has a value
   */
  _computeIconClass(icon) {
    return ['icon', icon].join(' ');
  }
}

customElements.define(ButtonClab.is, ButtonClab);
