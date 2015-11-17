class TooltipClab{

	beforeRegister(){
		this.is = "tooltip-clab";
		this.properties = {
			content: {
				type: String
			},
			type: {
				type: String,
				value: ""
			},
			ttType: {
				type: String,
				value: ""
			}
		}
	}

	_onHover(){
		document.querySelector('.kawo-tooltip').className = 'kawo-tooltip'; 
		document.querySelector('.kawo-tooltip-arrow').className = 'kawo-tooltip-arrow';
		if(this.ttType){
			document.querySelector('.kawo-tooltip').classList.add(this.ttType); 
			document.querySelector('.kawo-tooltip-arrow').classList.add(this.ttType);
		} 
	}

	_computeBtnClass(type){
		return ['tooltip',type].join(' ');
	}


}

Polymer(TooltipClab);

