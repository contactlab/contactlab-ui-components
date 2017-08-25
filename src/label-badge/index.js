'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import '@polymer/polymer/lib/elements/dom-if';

class LabelClab extends PolymerElement {

  static get is() { return 'label-clab'; }

  static get template() { return template; }

  static get properties() {
    return {
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

customElements.define(LabelClab.is, LabelClab);
