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
			placeholder:{
				type:String,
				value:'Select..'
			},
			disabled:{
				type:Boolean,
				value:false
			},
			disableOption:{
				type:Array,
				value: []
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

	ready(){
		if(this.url!=undefined && this.url!=null){
			this._fetchOptions();
		}
	}

	attached(){
		if(this.selected!=undefined) this._setValue(this.selected);
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
			let hasIdentity=evt.target.classList.contains(this.id);

			if(name=='ol' && hasClass) {
				return;
			} else if(name=='li' && hasClass || name=='span' && evt.target.parentNode.classList.contains(this.id) || name=='div' && hasIdentity){
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
		if(evt.target.getAttribute('disabled') === 'false'){
			let i=evt.target.getAttribute('data-index');

			this._setValue(this.options[i]);
			this._highlightEl(i);
			this.querySelector('.options-list').classList.remove('active');
			this.querySelector('.value_wrapper').classList.remove('active');
		}
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

	_setValue(item){
		let old = this.selected;
		this.set('selected',item);
		this._highlightEl(this._getIndex(item, this.options));

		if(!this.preventChange){
			if(this.resultAsObj)
				this.fire('change', {'selected':this.selected});
			else
				this.fire('change', {'selected':this.selected[this.valueField]});
		}
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

	_observUrl(newv, oldv){
		if(oldv!=undefined) this._fetchOptions();
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
			arr.push(this.id);
		}
		if(disabled) arr.push('disabled');
		if(type!=undefined) arr.push(type);
		return arr.join(' ');
	}

	_computeValue(option) {
		return option[this.valueField];
	}

	_computeLabel(option) {
		return option[this.labelField];
	}

	_computeDisabledLis(arr, i){
		let disable='false';
		arr.map((n)=>{
			if(n===parseInt(i)) {
				disable='true'; 
				return;
			}
		});
		return disable;
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
		return this.selected[this.labelField];
	}

	getSelectedValue(){
		return this.selected[this.valueField];
	}

	setByLabel(str){
		this.options.map(opt=>{
			if(opt[this.labelField]===str){
				this._setValue(opt);
				return;
			}
		});
	}

	setByValue(str){
		this.options.map(opt=>{
			if(opt[this.valueField]===str){
				this._setValue(opt);
				return;
			}
		});
	}

	isValorized() {
		return !this.isNotValorized();
	}

	isNotValorized() {
		return this.selected === undefined || this.selected === null || this.selected[this.valueField] === undefined || this.selected[this.valueField] === null;
	}

	setValue(obj, prevent){
		console.log('RULE-HEADER.setValue(' + (typeof obj) + '): ', obj);
		prevent = prevent ? true : false;
		this.preventChange = prevent;

		if(typeof obj === 'object'){
			this._setValue(obj);
			console.log('RULE-HEADER.setValue(obj): ', obj);
		} else {
			var realObj;
			this.options.map(opt=>{
				if(opt[this.valueField]===obj){
					this._setValue(opt);
					return;
				}
			});
		}

		this.preventChange=false;
	}

	getValue(){
		var v;
		if( this.isNotValorized() ) {
			v = undefined;

		} else if(typeof this.selected === 'string' || this.selected instanceof String) {
			v = this.selected;

		} else if(typeof this.selected === "object"){
			v = this.selected[this.valueField];

		} else {
			console.error(this.is + ": Invalid value type [" + (typeof this.selected) + "]");
		}
		return v;
	}

	getValueObject() {
		var v;
		if( this.isNotValorized(this.selected) ) {
			v = undefined;

		} else if(typeof this.selected === 'string' || this.selected instanceof String) {
			this.options.map(opt=>{
				if(opt[this.valueField] === this.selected) {
					v = opt;
					return;
				}
			});
			if(v === undefined) {
				console.warn(this.is + ": There is no option with value equal to [" + this.selected + "]");
			}

		} else if(typeof this.selected === "object"){
			v = this.selected;

		} else {
			console.warn(this.is + ": Invalid value type [" + (typeof this.selected) + "]");
		}
		return v;
	}

}



Polymer(DropdownClab);
