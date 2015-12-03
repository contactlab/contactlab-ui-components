class ToasterClab {

	beforeRegister(){
		this.is = "toaster-clab";
		this.properties = {
			right: {
				type: Boolean,
				value: false
			},
			message: {
				type: String
			},
			callerType: {
				type: String,
				value: 'primary'
			},
			actionType: {
				type: String,
				value: 'success'
			},
			actionText:{
				type: String,
				value: 'OK'
			},

			id: {
				type: Object,
				computed: 'computeIds(right)'
			},
			compCallerType: {
				type: String,
				computed: "computeType('btn', callerType)"
			},
			compActionType: {
				type: String,
				computed: "computeType('btn small flat', actionType)"
			}
		}
	}

	computeIds(isRight){
		this.name = 'right';
		if(!isRight) this.name = 'left';
		return {
			btn: "toast-"+ this.name +"-btn",
			toast: "toast-"+ this.name
		}
	}

	computeType(def,type){
		return [def,type].join(' ');
	}



	_toggleToast(evt){
		if(evt.target.id){
			this.$$('#toast-'+this.name).classList.add('visible');
		} else {
			this.$$('#toast-'+this.name).classList.remove('visible');
		}
	}

	_computeWrapperType(isRight){
		let type = 'toast-wrapper';
		if(isRight) type += ' right';
		return type;
	}

}


Polymer(ToasterClab);