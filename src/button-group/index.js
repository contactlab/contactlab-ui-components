'use strict';

import { PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import '@polymer/polymer/lib/elements/dom-repeat';
import './../button/';

class GroupClab extends PolymerElement {

  static get is() { return 'group-clab'; }

  static get template() { return template; }

	static get properties() { return props }

	/*----------
	OBSERVER
	----------*/
	_updateAppearance(val, old){
		if(old!==undefined && old !== val){
			this.dispatchEvent(new CustomEvent('change', {
				bubbles: true,
				composed: true,
				detail: {
					value: val
				}
			}));

			let btns = this.getContentChildren();
			Array.prototype.map.call(btns, (btn, i) => {
				btn.appearance = (i==this.value) ? '' : 'empty';
			});
		}
	}

	/*----------
	EVENT HANDLERS
	----------*/
	_selectElement(evt){
		this.set('value', parseInt(evt.target.getAttribute('data-i')) );
	}


	/*----------
	COMPUTED
	----------*/
	_computeGroupClass(type, size){
		const arr = [type, size];
		return arr.join(' ');
	}

	_computeItemClass(index,value){
		const arr = [];
		index !== value ? arr.push('empty') : null;
		return arr.join(' ');
	}

}


customElements.define(GroupClab.is, GroupClab);
