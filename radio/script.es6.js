class RadioClab{

	beforeRegister(){
		this.is = "radio-clab";
		this.properties = {
			labels: {
				type: Array
			},
			name: {
				type: String
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
		let arr = ['row'];
		arr.push(type);
		return arr.join(' ');
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


Polymer(RadioClab);