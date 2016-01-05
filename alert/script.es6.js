class AlertClab {

	beforeRegister(){
		this.is = "alert-clab";
		this.properties = {
			title: {
				type: String,
				value: 'Title'
			},
			type: {
				type: String,
				value: 'success'
			},
			visible: {
				type: Boolean,
				value: false
			},
			labels:{
				type: Object,
				value: {
					primary: 'Confirm',
					secondary: 'Cancel'
				}
			}
		}
	}

	_computeType(type){
		return ['alert',type].join(' ');
	}

	_close(){
		this.visible = false;
	}

	_handleClick(evt){
		if(evt.target.classList.contains('flat')){
			this.fire('primary');
		}else{
			this.fire('secondary');
		}
	}

}


Polymer(AlertClab);