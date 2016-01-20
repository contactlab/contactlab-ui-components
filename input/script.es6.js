class InputClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "input-clab";
		this.properties = {
			label: {
				type: String,
			},
			name: {
				type: String,
				value: 'textinput'
			},
			type: {
				type: String,
				value: ''
			},
			password: {
				type: Boolean,
				value: false
			},
			check: {
				type: Boolean,
				value: false
			},
			value: {
				type: String,
				notify: true,
				reflectToAttribute: true
			},
			disabled: {
				type: Boolean,
				value: false,
				observer: '_disabledChanged'
			},
			placeholder: {
				type: String
			},
			noteType: {
				type: String,
				value: ''
			},
			btnConfig:{
				type:Object,
				value:{
					show:{
						icon:'fa fa-eye',
						label:'Mostra password',
						type:"primary", 
						appearance:"flat", 
						size:""
					},
					hide:{
						icon:'fa fa-eye-slash',
						label:'Nascondi password',
						type:"error",
						appearance:"flat", 
						size:""
					}
				}
			},


			btnProps:{
				type:String,
				computed: '_computeToggleBtnProps(password, btnConfig)'
			},
			compNoteType: {
				type: String,
				computed: '_computeNoteType(type, noteType)'
			}
		}
	}



	/*----------
	EVENT HANDLERS
	----------*/
	_toggleInputType(evt){
		this.password=!this.password;
	}


	/*----------
	OBSERVERS
	----------*/
	_disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}



	/*----------
	COMPUTE
	----------*/
	_computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}

	_computeDataType(password){
		if(password){
			return 'password';
		}else{
			return 'text';
		}
	}

	_computeToggleBtnProps(pswd, btnConfig){
		if(pswd) 
			return btnConfig.show; 
		else 
			return btnConfig.hide; 
	}

}


Polymer(InputClab);
