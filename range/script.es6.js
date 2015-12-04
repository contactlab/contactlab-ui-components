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
				value: null
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
			disabled:{
				type: Boolean,
				value: false,
				observer: 'disabledChanged'
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

	computeRangeWrapperClasses(show){
		let name;
		if(show) name = 'details';
		return ['range-wrapper',name].join(' ');
	}

	disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
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