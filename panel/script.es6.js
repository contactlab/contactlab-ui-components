class PanelClab{

	beforeRegister(){
		this.is = 'panel-clab';
		this.properties = {
			title: {
				type: String,
				value: 'Title'
			},
			type: {
				type: String,
				value: ''
			}
		}
	}

	_computeType(type){
		return ['panel',type].join(' ');
	}

}


Polymer(PanelClab);