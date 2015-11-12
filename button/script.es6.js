class ButtonClab {

	beforeRegister(){
		this.is = 'button-clab';
		this.properties = {
			type: {
				type: String, 
				value: ""
			},
			appearance: {
				type: String, 
				value: ""
			},
			size: {
				type: String,
				value: ""
			},
			icon: {
				type: String, 
				value: ""
			},
			disabled: {
				type: Boolean, 
				value: false
			}
		}
	}


	_computeClass(type, appearance, size){
		return ['btn',type,appearance,size].join(' ');
	}

	_computeIconClass(icon){
		return ['icon',icon].join(' ');
	}
}

Polymer(ButtonClab);