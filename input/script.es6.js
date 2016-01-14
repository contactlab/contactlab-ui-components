class InputClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "input-clab";
		this.properties = {
			label: {
				type: String,
			},
			name: {
				type: String,
				value: 'textinput'
			},
			type: {
				type: String,
				value: ''
			},
			password: {
				type: Boolean,
				value: false
			},
			value: {
				type: String,
				notify: true,
				reflectToAttribute: true
			},
			disabled: {
				type: Boolean,
				value: false,
				observer: 'disabledChanged'
			},
			placeholder: {
				type: String
			},
			noteType: {
				type: String,
				value: ''
			},

			compNoteType: {
				type: String,
				computed: 'computeNoteType(type, noteType)'
			}
		}
	}


	/*----------
	OBSERVERS
	----------*/
	disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}



	/*----------
	COMPUTE
	----------*/
	computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}

	_computeDataType(password){
		if(password){
			return 'password';
		}else{
			return 'text';
		}
	}

}


Polymer(InputClab);
