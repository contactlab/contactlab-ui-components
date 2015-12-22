class DropdownClab{

	beforeRegister(){
		this.is = "dropdown-clab";
		this.properties = {
			label:{
				type:String,
				value:null
			},
			value:{
				type:Object,
				value:{}
			},
			options:{
				type: Array,
				value: [
					{value: 'A', label: 'Option 1'},
					{value: 'B', label: 'Option 2'}
				]
			},
			default:{
				type:Number,
				observer: '_setDefault'
			},
			optionsFn: {
				type: Function,
				observer: '_setOptions'
			},
			disabled:{
				type:Boolean,
				value:false
			},
			noteType: {
				type: String,
				value: ''
			},


			/*---------- 
			PRIVATE
			----------*/
			compNoteType: {
				type: String,
				computed: '_computeNoteType(type, noteType)'
			}
		};
	}

	attached(){
		this.addEventListener('mousedown', (evt)=>{
			if(evt.target.localName=='ol' || evt.target.localName=='li') this.dontHide=true; else this.dontHide=false;
		});
		this.addEventListener('mouseup', (evt)=>{ this.dontHide=false; });
	}


	/*---------- 
	EVENT HANDLERS
	----------*/
	_toggleList(evt){
		this.querySelector('.options-list').classList.toggle('active');
	}

	_handleBlur(evt){
		if(!this.dontHide) this.querySelector('.options-list').classList.remove('active');
	}

	_setThis(evt){
		let i=evt.target.getAttribute('data-index');
		this._setValue(this.options[i]);
		this._highlightEl(i);
		this._toggleList();
	}



	/*---------- 
	FUNCTIONS
	----------*/
	_setValue(item){
		this.set('value',item);
	}

	_highlightEl(i){
		Array.from(this.querySelectorAll('.options-list li')).forEach((el)=>{
			if(el.getAttribute('data-index')==i){
				el.classList.add('selected');
			} else {
				el.classList.remove('selected');
			}
		});
	}



	/*---------- 
	OBSERVERS
	----------*/
	_setOptions(promise){
		promise().then((resp) => {
			this.options = resp;
			this.liHeight = this.$.list.children[0].clientHeight;
		});
	}

	_setDefault(newval, oldval){
		this._setValue(this.options[newval]);
	}




	/*---------- 
	COMPUTED
	----------*/
	_computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}



	/*---------- 
	UTILS
	----------*/
	_getIndex(item, items){
		return items.indexOf(item);
	}

	_viewValue(val){
		if(val.hasOwnProperty('label')) return true; else return false;
	}

	_viewLabel(label) {
		if(label.length>0) return true; else return false;
	}

}



Polymer(DropdownClab);