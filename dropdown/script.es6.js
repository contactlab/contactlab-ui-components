class DropdownClab{

	get behaviors() {
      return [UtilBehavior, DropdownBehavior];
    }

	beforeRegister(){
		this.is = "dropdown-clab";
		this.properties = {
			label:{
				type:String,
				value:null
			},
			icon:{
				type:String,
				value:''
			},
			type:{
				type:String,
				value:''
			},
			noteType: {
				type:String
			},
			selected:{
				type:Object,
				value:{}
			},
			highlighted:Object,
			valueField: {
				type: String,
				value: 'value'
			},
			labelField: {
				type: String,
				value: 'label'
			},
			options:{
				type: Array,
				value: [
					{value: 'A', label: 'Option 1'},
					{value: 'B', label: 'Option 2'}
				]
			},
			optionsFn: {
				type: Function,
				observer: '_setOptions'
			},
			url:{
				type:String,
				observer: '_observUrl'
			},
			inline: {
				type: Boolean,
				value: false
			},
			labelSize: {
				type:String,
				value:''
			},
			placeholder:{
				type:String,
				value:'Select..'
			},
			disabled:{
				type:Boolean,
				value:false
			},
			preventChange: {
				type: Boolean,
				value: false
			},
			resultAsObj:{
				type:Boolean,
				value:false
			},
			maxInView:{
				type:Number,
				value:4
			},
			maxHeight: {
				type: Number,
				value: 28
			}
			/*_liHeight:{
				type:String,
				value:null,
				readonly: true
			}*/
		};
	}

	attached(){
		if(this.id===undefined || this.id.length<1){
			let id = '';
			let possible = "abcdefghijklmnopqrstuvwxyz";
			let n = Math.floor(Math.random() * (999 - 0) + 0);
			let time = Date.now();
			for( var i=0; i < 2; i++ ) id += possible.charAt(Math.floor(Math.random() * possible.length));
			id+=n;
			id+=time;
			this.id=id;
		}
	}



	/*----------
	EVENT HANDLERS
	----------*/
	_toggleList(evt){
		if(!this.disabled){
			this.$.curtain.open=!this.$.curtain.open;
			this.querySelector('.value_wrapper').classList.toggle('active');
		}

		let windowClick=(evt)=>{
			let name=evt.target.localName;
			let hasClass=evt.target.classList.contains('curtain-clab');
			let hasIdentity=evt.target.classList.contains(this.id);

			if(name=='ol' && hasClass) {
				return;
			} else if(name=='li' && hasClass || name=='span' && evt.target.parentNode.classList.contains(this.id) || name=='div' && hasIdentity){
				window.removeEventListener('mousedown', windowClick);
				return;
			} else {
				this.$.curtain.open=false;
				this.querySelector('.value_wrapper').classList.remove('active');
				window.removeEventListener('mousedown', windowClick);
			}
		}
		window.addEventListener('mousedown', windowClick);
	}

	handleSelect(evt){
		this._setSelected(this.options[evt.detail.index]);
	}

	_handleHighlight(evt){
		this.set('highlighted', this.options[evt.detail.index]);
	}




	/*----------
	METHODS
	----------*/
	_fetchOptions(){
		fetch(this.url, {
			method: 'GET'
		}).then(res=>{
			if (res.status !== 200) {
				console.log('Looks like there was a problem. Status Code: '+res.status);
				this.type='error';
				return;
			}

			res.json().then((data)=>{
				this.set('options',data);
			});

		}).catch(err=>{
			console.error("Fetch Error ==> ", err);
			this.type='error';
		});
	}

	_setSelected(item){
		let old = this.selected;
		this.set('selected',item);
		this.set('highlighted', item);
		this.$.curtain.open=false;
		this.querySelector('.value_wrapper').classList.remove('active');

		if(!this.preventChange){
			if(this.resultAsObj)
				this.fire('change', { 'selected':this.selected, 'newValue': this.selected, 'oldValue': old });
			else
				this.fire('change', { 'selected':this.selected[this.valueField], 'newValue': this.selected, 'oldValue': old });
		}
	}



	/*----------
	OBSERVERS
	----------*/
	_setOptions(promise){
		promise().then((resp) => {
			this.set('options', resp);
		});
	}

	_observUrl(newv, oldv){
		if(newv!=undefined) this._fetchOptions();
	}



	/*----------
	COMPUTED
	----------*/
	_viewValue(val,label){
		if(val && val[label]){
			return true
		} else {
			return false
		}
	}

	_compIcon(icon){
		if(icon!=undefined && icon.length>0) return 'clab-icon '+icon; else return '';
	}

	_compWrapperType(str, disabled, type, inline, labelSize){
		let arr=[str];
		if(disabled) arr.push('disabled');
		if(type!=undefined && type.length>0) arr.push(type);
		if(inline){
			arr.push('inline');
			if(labelSize.length>0) arr.push(labelSize+'-label');
		}
		return arr.join(' ');
	}

	_compType(str, disabled, type, id){
		let arr=[];
		if(str!=undefined && str.length>0) arr.push(str);
		if(id!=undefined && id.length>0) arr.push(id);
		if(disabled) arr.push('disabled');
		if(type!=undefined && type.length>0) arr.push(type);
		return arr.join(' ');
	}

	_compValue(option){
		return option? option[this.valueField] : '';
	}

	_compLabel(option){
		return option? option[this.labelField] : '';
	}

	_compMaxHeight(height){
		return height ? height: '';
	}


}



Polymer(DropdownClab);
