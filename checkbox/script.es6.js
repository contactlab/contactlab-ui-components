class CheckboxClab{

	beforeRegister(){
		this.is = "checkbox-clab";
		this.properties = {
			labels: {
				type: Array
			},
			wrapperType: {
				type: String,
				value: ''
			},
			active: {
				type: Number
			},
			disabled: {
				type: Array
			}
		}
	}

	_dashify(label){
		let str = label.replace(' ','-');
		return str.toLowerCase();
	}

	_computeType(type){
		return ['row',type].join(' ');
	}

	_checkIfTrue(i, n){
		if(typeof n === 'number'){
			return i == n;
		} else if(typeof n === 'object'){
			for(let x=0; x<n.length; x++){
				if(i == n[x]) return true;
			}
		}
	}

}


Polymer(CheckboxClab);