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
			},
			/*primary: {
				type: Boolean,
				value: false
			},
			secondary: {
				type: Boolean,
				value: false
			},
			info: {
				type: Boolean,
				value: false
			},
			success: {
				type: Boolean,
				value: false
			},
			warning: {
				type: Boolean,
				value: false
			},
			error: {
				type: Boolean,
				value: false
			}*/
		}
	}



	/*---------- 
	COMPUTED
	----------*/
	_computeProp(value){
		return 'width:' + this.value + '%;';
	}

	/*_computeClass(minimal,color){
		let vals = ['minimal','primary','secondary','info','success','warning','error'];
		let classes = ['progress-bar'];
		for(let i = 0; i < arguments.length; i++){
			arguments[i] ? classes.push(vals[i]) : null;
		}
		return classes.join(' ');
	}*/
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