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
				observer: '_initialize',
				reflectToAttribute: true
			}
		}
	}

	attached(){
		let btns = this.getContentChildren();
		Array.from(btns).forEach(btn => {
			btn.classList.add('group-item');
		});
		this._initialize();
	}

	/**
	* observer function of the 'disabled' prop
	*/
	_updateDisabled(){
		let btns = this.querySelectorAll('button');
		Array.from(btns).forEach(btn => {
			btn.disabled = this.disabled;
		});
	}

	_initialize(){
		let btns = this.getContentChildren();
		Array.from(btns).forEach(btn => {
			(typeof btn.appearance === 'string') ? btn.appearance = '' : null;
			btn.setAttribute('data-i', btns.indexOf(btn));
			btn.addEventListener('click',this._selectElement.bind(this))
		});
		(typeof btns[this.value].appearance === 'string') ? btns[this.value].appearance = 'full' : null;
		this.fire('change', {value: this.value});
	}

	_computeGroupClass(type,small){
		let arr = ['buttons-group',type];
		small ? arr.push('small') : null;
		return arr.join(' ');
	}

	_selectElement(evt){
		evt.preventDefault();
		let btns = this.getContentChildren();
		Array.from(btns).forEach(btn => {
			btn.appearance = '';
		});
		this.value = parseInt(evt.target.parentNode.getAttribute('data-i'));
		btns[this.value].appearance = 'full';
	}
}


Polymer(GroupClab);