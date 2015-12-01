class FeatureClab {

	beforeRegister(){
		this.is = "feature-clab";
		this.properties = {
			link: {
				type: String,
				value: '#'
			},
			iconClass: {
				type: String,
				value: null
			},
			src: {
				type: String,
				value: null
			},
			size: {
				type: String,
				value: null
			},
			vertical: {
				type: Boolean,
				value: false
			}
		}
	}

	_computeFeatureClass(size, vertical){
		let arr = ['feature'];
		if(size) arr.push(size+'-icon');
		if(vertical) arr.push('vertical');
		return arr.join(' ');
	}


}


Polymer(FeatureClab);