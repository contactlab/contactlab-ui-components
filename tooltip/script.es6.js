class TooltipClab{

	beforeRegister(){
		this.is = "tooltip-clab";
		this.properties = {
			content: {
				type: String,
				value: "The content"
			},
			hideTrigger: {
				type: String,
				value: ""
			}
		}
	}

	_sayHi(){
		console.log('ciao');
	}

}

Polymer(TooltipClab);

