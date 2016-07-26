class FeatureClab {

	beforeRegister(){
		this.is = "feature-clab";
		this.properties = {
			link: {
				type: String,
				value: ''
			},
			linkTarget: {
				type:String,
				value:'_self'
			},
			iconClass: String,
			src: String,
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
