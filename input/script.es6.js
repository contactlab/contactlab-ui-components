class InputClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "input-clab";
		this.properties = {
			label: {
				type:String,
				value:''
			},
			icon:{
				type:String,
				value:''
			},
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
			inline: {
				type: Boolean,
				value: false
			},
			labelSize: {
				type:String,
				value:''
			},
			placeholder: String,
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
	_compWrapperClass(str, inline, labelSize){
		let arr=[str];
		if(inline){
			arr.push('inline');
			if(labelSize.length>0) arr.push(labelSize+'-label');
		}
		return arr.join(' ');
	}

	_compIcon(icon){
		if(icon!=undefined && icon.length>0) return 'clab-icon '+icon; else return '';
	}

	_computeInputType(password){
		if(password){
			return 'password';
		}else{
			return 'text';
		}
	}

	_computeBtnPswd(val, old){
		if(val)
			this.set('_btnPswd', this.btnPswd.show);
		else
			this.set('_btnPswd', this.btnPswd.hide);
	}

}


Polymer(InputClab);
