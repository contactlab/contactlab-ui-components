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


	/*---------- 
	COMPUTE
	----------*/
	_computeFeatureClass(size, vertical){
		let arr = ['feature'];
		if(size) arr.push(size);
		if(vertical) arr.push('vertical');
		return arr.join(' ');
	}


}


Polymer(FeatureClab);