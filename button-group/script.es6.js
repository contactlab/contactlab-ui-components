class GroupClab{

	beforeRegister(){
		this.is = 'group-clab';
		this.properties = {
			/**
	       * Whether the buttons are small
	       */
			small: {
				type: Boolean,
				value: false
			},
			/**
	       * Whether the buttons are smaller
	       */
			smaller: {
				type: Boolean,
				value: false
			},
			/**
	       * Whether the buttons are disabled
	       */
			disabled: {
				type: Boolean,
				value: false,
				observer: '_updateDisabled'
			},
			/**
	       * Additional class
	       */
			type: {
				type: String,
				value: ""
			},
			/**
	       * Index of the button active at init
	       */
			value: {
				type: Number,
				value: 0,
				observer: '_updateAppearance',
				reflectToAttribute: true
			}
		}
	}

	attached(){
		let btns = this.getContentChildren();
		Array.prototype.map.call(btns, (btn, i) => {
			btn.classList.add('group-item');
			btn.appearance = (i==this.value) ? '' : 'empty';
			btn.setAttribute('data-i', i);
			btn.addEventListener('btnclick', this._selectElement.bind(this));
		});
	}



	/*----------
	OBSERVER
	----------*/
	_updateDisabled(val, old){
		let btns = this.getContentChildren();
		Array.prototype.map.call(btns, btn => {
			btn.disabled = val;
		});
	}

	_updateAppearance(val, old){
		if(old!==undefined && old !== val){
			this.fire('change', { value: val });

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
		this.set('value', Number(evt.target.getAttribute('data-i')) );
	}




	/*----------
	COMPUTED
	----------*/
	_computeGroupClass(type,small,smaller){
		let arr = ['buttons-group',type];
		small ? arr.push('small') : null;
		smaller ? arr.push('smaller') : null;
		return arr.join(' ');
	}


}


Polymer(GroupClab);
