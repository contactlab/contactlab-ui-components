class DropdownClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "dropdown-clab";
		this.properties = {
			label:{
				type:String,
				value:null
			},
			type:{
				type:String,
				value:''
			},
			selected:{
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
			optionsFn: {
				type: Function,
				observer: '_setOptions'
			},
			placeholder:{
				type:String,
				value:'Select..'
			},
			disabled:{
				type:Boolean,
				value:false
			},
			resultAsObj:{
				type:Boolean,
				value:false
			},
			maxInView:{
				type:Number,
				value:4
			},
			noteType: {
				type: String
			},


			/*----------
			PRIVATE
			----------*/
			compNoteType: {
				type: String,
				computed: '_computeNoteType(type, noteType)'
			},
			liHeight:{
				type:String,
				value:null,
				readonly: true
			}
		};
	}

	attached(){
		if(this.selected!=undefined) this._setValue(this.selected);
		this.identity=this._dashify(this.label);
	}


	/*----------
	EVENT HANDLERS
	----------*/
	_toggleList(evt){
		if(!this.disabled){
			if(this.liHeight==null){
				this.querySelector('.options-list').classList.add('hidden');
				this._setMaxHeight();
				setTimeout(()=>{
					this.querySelector('.options-list').classList.remove('hidden');
					this.querySelector('.options-list').classList.add('active');
					this.querySelector('.value_wrapper > span').classList.add('active');
				},50);
			} else {
				this.querySelector('.options-list').classList.toggle('active');
				this.querySelector('.value_wrapper').classList.toggle('active');
			}
		}


		let windowClick=(evt)=>{
			let name=evt.target.localName;
			let hasClass=evt.target.classList.contains('dropdown-clab');
			let hasIdentity=evt.target.classList.contains(this.identity);

			if(name=='ol' && hasClass) {
				return;
			} else if(name=='li' && hasClass || name=='span' && evt.target.parentNode.classList.contains(this.identity) || name=='div' && hasIdentity){
				window.removeEventListener('mousedown', windowClick);
				return;
			} else {
				this.querySelector('.options-list').classList.remove('active');
				this.querySelector('.value_wrapper').classList.remove('active');
				window.removeEventListener('mousedown', windowClick);
			}
		}
		window.addEventListener('mousedown', windowClick);
	}

	_setThis(evt){
		let i=evt.target.getAttribute('data-index');
		this._setValue(this.options[i]);
		this._highlightEl(i);
		this.querySelector('.options-list').classList.remove('active');
		this.querySelector('.value_wrapper').classList.remove('active');
	}



	/*----------
	FUNCTIONS
	----------*/
	_setValue(item){
		let old = this.selected;
		this.set('selected',item);
		this._highlightEl(this._getIndex(item, this.options));

		if(this.resultAsObj)
			this.fire('change', {'selected':this.selected});
		else
			this.fire('change', {'selected':this.selected.label});

	}

	_highlightEl(i){
		Array.prototype.map.call(this.querySelectorAll('.options-list li'), (el)=>{
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
			this.set('options', resp);
		});
	}



	/*----------
	COMPUTED
	----------*/
	_computeNoteType(type, noteType){
		var arr=[];
		if(type!=undefined) arr.push(type);
		if(noteType!=undefined) arr.push(noteType);

		if(arr.length>0) return arr.join(' ');
	}

	_compType(disabled, type, def){
		let arr=[];
		if(def!=undefined) {
			arr.push(def);
			arr.push(this._dashify(this.label));
		}
		if(disabled) arr.push('disabled');
		if(type!=undefined) arr.push(type);
		return arr.join(' ');
	}



	/*----------
	UTILS
	----------*/
	_viewValue(val){
		if(val.hasOwnProperty('label')) return true; else return false;
	}

	_setMaxHeight(){
		this.liHeight=this.querySelectorAll('.options-list li')[0].clientHeight;
		this.querySelector('.options-list').style.maxHeight=(this.liHeight*this.maxInView)+'px';
	}



	/*----------
	PUBLIC
	----------*/
	getSelectedLabel(){
		return this.selected.label;
	}

	getSelectedValue(){
		return this.selected.value;
	}

	setByLabel(str){
		this.options.map(opt=>{
			if(opt.label===str){
				this._setValue(opt);
			}
		});
	}

	setByValue(str){
		this.options.map(opt=>{
			if(opt.value===str){
				this._setValue(opt);
			}
		});
	}

}



Polymer(DropdownClab);
