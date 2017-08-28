'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import {
  _computeCardClass,
  _computeEffectClass,
  _showActions,
  _showLink,
  _showTitle
} from './methods/internal';
import template from './view.html';
import '@polymer/polymer/lib/elements/dom-if';
import "./../button";
import props from './props';

class CardClab extends mixinBehaviors(
  [{_computeCardClass, _computeEffectClass, _showActions, _showLink, _showTitle }], PolymerElement) {

  static get is() { return 'card-clab'; }

  static get template() { return template; }

  static get properties() { return props }

  _handleClickP(evt) {
    this.dispatchEvent(new CustomEvent('primary',{
      bubbles: true,
      composed: true
    }));
  }

   _handleClickS(evt) {
    this.dispatchEvent(new CustomEvent('secondary',{
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define(CardClab.is, CardClab);
