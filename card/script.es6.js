class CardClab {

	beforeRegister(){
		this.is = "card-clab";
		this.properties = {
			title: {
				type: String,
				value: null
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
			},
			noActions: {
				type:Boolean,
				value:false
			},
			link: {
				type:Object,
				value:null
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

	_showActions(noactions, link){
		if(link) return false;
		return !!!noactions;
	}

	_showTitle(title){
		title==null? false :  true;
	}


}


Polymer(CardClab);