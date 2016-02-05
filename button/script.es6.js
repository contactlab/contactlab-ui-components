class ButtonClab {

	beforeRegister(){
		this.is = 'button-clab';
		this.properties = {
			/**
	       * `type` additional class for the type of btn
	       */
			type: {
				type: String, 
				value: ""
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
				value: false
			}
		}
	}

	_click(evt){
		this.fire('btnclick');
	}

	/**
	* Computes the class of the button joining the values of 'type', 'appearence' and 'size'
	*/
	_computeClass(type, appearance, size){
		return ['btn',type,appearance,size].join(' ');
	}

	/**
	* Computes the class of the icon if 'icon' has a value
	*/
	_computeIconClass(icon){
		return ['icon',icon].join(' ');
	}
}

Polymer(ButtonClab);