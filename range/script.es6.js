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
				value: 'primary'
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
			},
			showDetails: {
				type: Boolean,
				value: false
			},

			rangeWrapperClasses: {
				type: String,
				computed: 'computeRangeWrapperClasses(showDetails)'
			}
		}
	}


	/*_computeType(type){
		let arr = ['input-wrapper'];
		arr.push(type);
		return arr.join(' ');
	}*/

	computeRangeWrapperClasses(show){
		let name;
		if(show) name = 'details';
		return ['range-wrapper',name].join(' ');
	}

	_updateCompValue(evt){
		console.log(evt);
		this.value = this.$$('input').value;
	}

	_dashify(label){
		return label.toLowerCase().replace(' ','-');
	}

	_viewLabel(label) {
		if(label.length > 0)
			return true;
		else
			return false;
	}

}


Polymer(RangeClab);