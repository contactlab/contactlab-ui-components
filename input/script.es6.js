class InputClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "input-clab";
		this.properties = {
			label: {
				type:String,
				value:null,
				reflectToAttribute: true
			},
			icon:{
				type:String,
				value:null,
				reflectToAttribute: true
			},
			name: {
				type: String,
				value: 'textinput',
				reflectToAttribute: true
			},
			type: {
				type:String,
				value:null,
				reflectToAttribute: true
			},
			noteType: String,
			value: {
				type: String,
				notify: true,
				reflectToAttribute: true
			},
			disabled: {
				type: Boolean,
				value: false,
				observer: '_disabledChanged',
				reflectToAttribute: true
			},
			inline: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			labelSize: {
				type:String,
				value:null
			},
			placeholder: {
				type: String,
				reflectToAttribute: true
			},
			check: {
				type: Boolean,
				value: false
			},
			required: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
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


	attached(){
		Array.prototype.map.call(this.getEffectiveChildren(), node=>{
			if(node.classList.contains('note')){
				Polymer.dom(this.$$('note-clab')).appendChild(node);
				Polymer.dom.flush();
			}
		})
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
	_compWrapperClass(str, type, inline, labelSize){
		let arr=[str];
		if(type!=null) arr.push(type);
		if(inline){
			arr.push('inline');
			if(labelSize!=null) arr.push(labelSize+'-label');
		}
		return arr.join(' ');
	}

	_compIcon(icon){
		if(icon!=undefined) return 'clab-icon '+icon; else return '';
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
