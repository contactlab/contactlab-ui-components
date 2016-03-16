class InputClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "input-clab";
		this.properties = {
			label: String,
			name: {
				type: String,
				value: 'textinput'
			},
			type: String,
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
			placeholder: String,
			noteType: String,
			check: {
				type: Boolean,
				value: false
			},
			btnPswd:{
				type:Object,
				value:{
					show:{
						icon:'',
						label:'Show',
						type:"",
						appearance:"",
						size:""
					},
					hide:{
						icon:'',
						label:'Hide',
						type:"",
						appearance:"",
						size:""
					}
				}
			},
			_btnPswd:Object,
			password: {
				type: Boolean,
				value: false,
				observer: '_computeBtnPswd'
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

	_btnclick(evt){
		this.fire('btnclick');
	}

	_blur(evt){
		this.fire('blur', {input:evt});
	}
	_focus(evt){
		this.fire('focus', {input:evt});
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

	_computeInputType(password){
		if(password){
			return 'password';
		}else{
			return 'text';
		}
	}

	_ifBtn(label){
		if(label!='' && label.length>0) return true; else return false;
	}

	_computeBtnPswd(val, old){
		if(val)
			this.set('_btnPswd', this.btnPswd.show);
		else
			this.set('_btnPswd', this.btnPswd.hide);
	}

}


Polymer(InputClab);
