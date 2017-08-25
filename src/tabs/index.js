'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import '@polymer/polymer/lib/elements/dom-repeat';

class TabsClab extends PolymerElement {

  static get is() { return 'tabs-clab'; }

  static get template() { return template; }

  static get properties() {
    return props;

    this.observers = [
			'_changeTab(active, _content)'
		]
  }


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
  OBSERVERS
  ----------*/

  _changeTab(active, content) {
		/*if (active != undefined) {
			if (content != undefined && content.length > 0) {
				while (Polymer.dom(this.$.activeContentWrapper).firstChild) {
					Polymer.dom(this.$.activeContentWrapper).removeChild(Polymer.dom(this.$.activeContentWrapper).firstChild);
				}
				Array.prototype.map.call(this._content, (node, i) => {
					if (i == active) {
						Polymer.dom(this.$.activeContentWrapper).appendChild(node);
						Polymer.dom.flush();
						return;
					}
				});
			}
		}*/
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


}


customElements.define(TabsClab.is, TabsClab);
