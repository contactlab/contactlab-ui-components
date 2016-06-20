class ButtonClab {

	beforeRegister(){
		this.is = 'button-clab';
		this.properties = {
			/**
	       * `type` additional class for the type of btn
	       */
			type: {
				type: String,
				value: "",
				reflectToAttribute: true
			},
			/**
	       * `appearance` additional class for the type
	       */
			appearance: {
				type: String,
				value: ""
			},
			/**
	       * `size` additional class for the size
	       */
			size: {
				type: String,
				value: ""
			},
			/**
	       * `type` insert a valid icon class to add an icon
	       */
			icon: {
				type: String,
				value: ""
			},
			/**
	       * Whether is disabled or not
	       */
			disabled: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			/**
	       * If it use block layout (auto width)
	       */
			block: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			}
		}
	}

	_click(evt){
		this.fire('btnclick');
	}

	/**
	* Computes the class of the button joining the values of 'type', 'appearence' and 'size'
	*/
	_computeClass(type, appearance, size, block){
		let arr = ['btn',type,appearance,size];
		block ? arr.push('block') : null;
		return arr.join(' ');
	}

	/**
	* Computes the class of the icon if 'icon' has a value
	*/
	_computeIconClass(icon){
		return ['icon',icon].join(' ');
	}
}

Polymer(ButtonClab);
