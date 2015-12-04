class MultiSelClab {

	beforeRegister(){
		this.is = "multi-sel-clab";
		this.properties = {
			name: {
				type: String,
				value: 'multiple select'
			},
			options:{
				type: Array,
				value: [
					{value: 'A', label: 'Option 1'},
					{value: 'B', label: 'Option 2'},
					{value: 'C', label: 'Option 3'},
					{value: 'D', label: 'Option 4'},
					{value: 'E', label: 'Option 5'}
				]
			},
			type:{
				type: String,
				value: null
			},
			label:{
				type: String,
				value: null
			},
			disabled:{
				type: Boolean,
				value: false,
				observer: 'disabledChanged'
			},
			noteType: {
				type: String,
				value: ''
			},

			compNoteType: {
				type: String,
				computed: 'computeNoteType(type, noteType)'
			}
			/*optionsFn: {
				type: Function,
				observer: '_setOptions'
			}*/
		}
	}

	computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}

	/*---------- 
	UTILITIES	
	----------*/

	_dashify(str){
		return str.replace(/ /g,'-');
	}


	/*---------- 
	OBSERVERS
	----------*/

	disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}

}


Polymer(MultiSelClab);