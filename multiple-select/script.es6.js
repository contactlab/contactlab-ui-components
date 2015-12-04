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
				value: 'primary'
			},
			label:{
				type: String,
				value: null
			},
			disabled:{
				type: Boolean,
				value: false,
				observer: 'disabledChanged'
			}
			/*optionsFn: {
				type: Function,
				observer: '_setOptions'
			}*/
		}
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