class ProgressClab{

	beforeRegister(){
		this.is = 'progress-clab';
		this.properties ={
			value: {
				type: Number,
				value: 0
			},
			minimal: {
				type: Boolean,
				value: false
			},
			type: {
				type: String,
				value: null
			}
		}
	}



	/*---------- 
	COMPUTED
	----------*/
	_computeProp(value){
		return 'width:' + this.value + '%;';
	}

	_computeClass(minimal, type){
		let arr = ['progress-bar'];
		if(minimal) arr.push('minimal');
		if(type != null) arr.push(type);
		return arr.join(' ');
	}



	/*---------- 
	UTILS
	----------*/
	_percent(value){
		return value + '%';
	}

}

Polymer(ProgressClab);