'use strict';

import { PolymerElement } from '@polymer/polymer/polymer-element';
import { DomApi as dom } from '@polymer/polymer/lib/legacy/polymer.dom';
import template from './view.html';
import props from './props';
import '@polymer/polymer/lib/elements/dom-repeat';

class TabsClab extends PolymerElement {

  static get is() { return 'tabs-clab'; }

  static get template() { return template; }

  static get properties() { return props; }

  /*----------
  EVENT HANDLERS
  ----------*/
  _activateThis(evt) {
    evt ? evt.preventDefault() : null;
    this.active = parseInt(evt.currentTarget.parentNode.getAttribute('data-index'));
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        active: this.active
      }
    }));
  }

  /*----------
  COMPUTED
  ----------*/
  _computeType(pills, vertical, centered, fullWidth) {
    let arr = [];
    pills ? arr.push('pills') : arr.push('tabs');
    if(vertical) arr.push('vertical');
    if(centered) arr.push('centered');
    if(fullWidth) arr.push('full-width');
    return arr.join(' ');
  }

  _computeActive(active, index) {
		let arr = ['tab'];
		if (active === index) {
			arr.push('active');
			this.set('current', this.labels[active]);
		};
		return arr.join(' ');
	}

  connectedCallback(){
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        active: this.active
      }
    }));
  }

}


customElements.define(TabsClab.is, TabsClab);
