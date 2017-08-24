'use strict';

import './../button/';
import './view.html';

class GroupClab extends Polymer.Element {

	static get is() { return 'group-clab'; }

	static get properties() {
    	return {
			/**
			* Additional class
			*/
			options: {
				type: Array,
				value: ['Option 1', 'Option 2']
			},
			/**
			* Additional class
			*/
			type: {
				type: String,
				value: ''
			},
			/**
			* `size` additional class for the size of the buttons
			*/
			size:{
				type: String,
				value: ''
			},
			/**
			* Whether the buttons are disabled
			*/
			disabled: {
				type: Boolean,
				value: false
			},
			/**
			* Index of the button active at init
			*/
			value: {
				type: Number,
				value: 0,
				reflectToAttribute: true
			}
		}
	}

	connectedCallback(){
    	super.connectedCallback();
		// let btns = this.getContentChildren();
		/*let btns = this.$$('div.buttons-group button-clab');
		Array.prototype.map.call(btns, (btn, i) => {
			btn.classList.add('group-item');
			btn.appearance = (i==this.value) ? '' : 'empty';
			btn.setAttribute('data-i', i);
			btn.addEventListener('btnclick', this._selectElement.bind(this));
		});*/
	}


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
		let arr = [type, size];
		return arr.join(' ');
	}

	_computeItemClass(index,value){
		let arr = [];
		index !== value ? arr.push('empty') : null;
		return arr.join(' ');
	}

}


customElements.define(GroupClab.is, GroupClab);
