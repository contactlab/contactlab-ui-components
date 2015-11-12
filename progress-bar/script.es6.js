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
			primary: {
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
			}
		}
	}

	computeProp(value){
		return 'width:' + this.value + '%;';
	}

	computeClass(minimal,color){
		let vals = ['minimal','primary','secondary','info','success','warning','error'];
		let classes = ['progress-bar'];
		for(let a of arguments){
			a ? classes.push(vals[i]) : null;
		}
		return classes.join(' ');
	}

	percent(value){
		return value + '%';
	}

}

Polymer(ProgressClab);