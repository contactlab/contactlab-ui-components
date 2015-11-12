class SpinnerClab{

	beforeRegister(){
		this.is = 'spinner-clab';
		this.properties = {
			dark: {
				type: Boolean,
				value: false
			},
			big: {
				type: Boolean,
				value: false
			}
		}
	}

	computeClass(big,dark){
		let str = 'spinner-overlay ';
		this.dark ? str += ' dark ' : null;
		this.big ? str += ' big ' : null;
		return str;
	}

}
Polymer(SpinnerClab);