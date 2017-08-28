'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { _computeClass, _computeIconClass } from './methods/internal';
import template from './view.html';
import props from './props';

class ButtonClab extends mixinBehaviors(
  [{ _computeClass, _computeIconClass }], PolymerElement) {

  static get is() { return 'button-clab'; }

  static get template() { return template; }

  static get properties() { return props }

  _click(evt) {
    this.dispatchEvent(new CustomEvent('btnclick',{
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define(ButtonClab.is, ButtonClab);
