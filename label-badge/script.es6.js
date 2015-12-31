class LabelClab{

	beforeRegister(){
		this.is = 'label-clab';
		this.properties = {
			type: {
				type: String,
				value: ''
			},
			counter: {
				type: Number,
				value: null
			},
			remove: {
				type: Boolean,
				value: false
			},
			badge: {
				type: Boolean,
				value: false
			}
		}
	}
	

	/*---------- 
	EVENT HANDLERS
	----------*/
	_removeClicked(evt){
		this.fire('remove');
	}


	/*---------- 
	COMPUTE
	----------*/
	_computeClass(badge,type){
		let str = badge ? 'badge' : 'label';
		return [str,type].join(' ');
	}

}

Polymer(LabelClab);