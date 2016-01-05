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
		Array.prototype.map.call(btns, btn => {
			btn.classList.add('group-item');
		});
		this._initialize();
	}



	/*---------- 
	OBSERVER
	----------*/
	_updateDisabled(){
		let btns = this.querySelectorAll('button');
		Array.prototype.map.call(btns, btn => {
			btn.disabled = this.disabled;
		});
	}



	/*---------- 
	METHODS
	----------*/
	_initialize(){
		let btns = this.getContentChildren();
		Array.prototype.map.call(btns, btn => {
			(typeof btn.appearance === 'string') ? btn.appearance = '' : null;
			btn.setAttribute('data-i', btns.indexOf(btn));
			btn.addEventListener('click',this._selectElement.bind(this))
		});
		(typeof btns[this.value].appearance === 'string') ? btns[this.value].appearance = 'full' : null;
		this.fire('change', {value: this.value});
	}

	_selectElement(evt){
		evt.preventDefault();
		let btns = this.getContentChildren();
		Array.prototype.map.call(btns, btn => {
			btn.appearance = '';
		});
		this.value = parseInt(evt.target.parentNode.getAttribute('data-i'));
		btns[this.value].appearance = 'full';
	}



	/*---------- 
	COMPUTED
	----------*/
	_computeGroupClass(type,small){
		let arr = ['buttons-group',type];
		small ? arr.push('small') : null;
		return arr.join(' ');
	}

	
}


Polymer(GroupClab);