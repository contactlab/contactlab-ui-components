class RangeClab{

	beforeRegister(){
		this.is = "range-clab";
		this.properties = {
			label: {
				type: String,
			},
			name: {
				type: String,
				value: 'rangeinput'
			},
			type: {
				type: String,
				value: ''
			},
			value: {
				type: Number,
				notify: true,
				reflectToAttribute: true
			},
			min: {
				type: Number
			},
			max: {
				type: Number
			},
			step: {
				type: Number
			}
		}
	}


	_computeType(type){
		let arr = ['input-wrapper'];
		arr.push(type);
		return arr.join(' ');
	}

	_updateCompValue(evt){
		this.value = this.querySelector('input').value;
		console.log(this.value);
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


Polymer(RangeClab);