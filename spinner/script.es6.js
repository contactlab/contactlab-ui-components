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
			},
			background: {
				type:String,
				value: '255, 255, 255, 0.9'
			}
		}
	}

	ready(){
		this.querySelector('.spinner-overlay').style.backgroundColor='rgba('+this.background+')';
	}



	/*---------- 
	COMPUTED
	----------*/
	computeClass(big,dark){
		let str = 'spinner-overlay ';
		this.dark ? str += ' dark ' : null;
		this.big ? str += ' big ' : null;
		return str;
	}

}
Polymer(SpinnerClab);