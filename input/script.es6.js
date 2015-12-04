class InputClab{

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

	computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}

	disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}

	_updateCompValue(evt){
		this.value = this.$$('input').value;
	}

	_dashify(label){
		let str = label.replace(' ','-');
		return str.toLowerCase();
	}

	_viewLabel(label) {
		if(label.length > 0)
			return true;
		else
			return false;
	}

}


Polymer(InputClab);