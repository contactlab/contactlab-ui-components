class CardClab {

	beforeRegister(){
		this.is = "card-clab";
		this.properties = {
			title: {
				type: String,
				value: 'Title'
			},
			primaryLabel: {
				type: String,
				value: 'OK'
			},
			secondaryLabel: {
				type: String,
				value: 'Cancel'
			},
			icon: {
				type: String,
				value: ''
			},
			big: {
				type: Boolean,
				value: false
			},
			table: {
				type: Boolean,
				value: false
			},
			figure: {
				type: String,
				value: null
			},
			effect: {
				type: String,
				value: null
			}
		}
	}


	_computeIconClass(icon){
		return icon;
	}

	_computeCardClass(big){
		let classes = ['card-title'];
		big ? classes.push('big-icon') : null;
		return classes.join(' ');
	}

	_computeEffectClass(effect){
		return ['card', effect].join(' ');
	}


}


Polymer(CardClab);