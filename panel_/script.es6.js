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


	/*---------- 
	COMPUTED
	----------*/
	_computeType(type){
		return ['panel',type].join(' ');
	}

}


Polymer(PanelClab);