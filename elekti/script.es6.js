class ElektiMer{

	beforeRegister(){
		this.is = "elekti-mer";
		this.properties = {
			label: {
				type: String,
			},
			name: {
				type: String,
				value: 'elekti'
			},
			type: {
				type: String,
				value: null
			},
			options: {
				type: Array,
				value: [
					{value: 'A', label: 'Option 1'},
					{value: 'B', label: 'Option 2'}
				]
			},
			valueField: {
				type: String,
				value: 'value'
			},

			labelField: {
				type: String,
				value: 'label'
			},

			default: {
				type:Number,
				//observer: '_setDefault'
			},
			placeholder: {
				type: String,
				value: 'Select...'
			},
			value: {
				type: Object,
				reflectToAttribute: true,
				notify: true,
				observer: '_updateValue'
			},
			valuesArr: {
				type: Array,
				value: [],
				notify: true
			},
			open: {
				type: Boolean,
				value: false,
				readonly: true
			},
			disabled: {
				type: Boolean,
				value: false
			},
			preventChange: {
				type: Boolean,
				value: false
			},
			noSearch: {
				type: Boolean,
				value: false,
				observer: '_setDisabled'
			},
			noResults: {
				type: String,
				value: 'No results found'
			},
			optionsFn: {
				type: Function,
				observer: '_setOptions'
			},

			noteType: {
				type: String,
				value: ''
			},
			compNoteType: {
				type: String,
				computed: '_computeNoteType(type, noteType)'
			}
		}
	}

	// ==========================================================================================================================
	// Public
	// ==========================================================================================================================

	isValorized() {
		return !this.isNotValorized();
	}

	isNotValorized() {
		return this.value === undefined || this.value === null;
	}


	// setValue(obj, prevent){
	// 	prevent = prevent ? true : false;
	// 	this.preventChange = prevent;
	// 	this.set('value', obj);
	// 	this.preventChange = false;
	// }

	setValue(obj, prevent){
		prevent = prevent ? true : false;
		this.preventChange = prevent;
		if((_typeof(this.value) === "object")) {
				this.set('value', obj);
		} else {
			var realObj;
			for (var i = 0; i < this.options.length; i++) {
				if(this.options[i][this.valueField] === obj) {
					realObj = this.options[i];
					break;
				}
			}
			if(realObj) this.set('value', realObj);
		}
		this.preventChange = false;
	}

	getValue() {
		var v;
		if( this.isNotValorized() ) {
			v = undefined;
		} else if(typeof this.value === 'string' || this.value instanceof String) {
			v = this.value;
		} else if(typeof this.value === "object"){
			v = this.value[this.valueField];
		} else {
			console.error(this.is + ": Invalid value type [" + (typeof this.value) + "]");
		}
		return v;
	}

	getValueObject() {
		var v;
		if( this.isNotValorized(this.value) ) {
			v = undefined;
		} else if(typeof this.value === 'string' || this.value instanceof String) {
			for(var i = 0; i < options.length; i++) {
				if(options[i][this.valueField] === this.value) {
					v = options[i];
				}
				break;
			}
			if(v === undefined) {
				console.warn(this.is + ": There is no options with value equals to [" + this.value + "]");
			}
		} else if(typeof this.value === "object"){
			v = this.value;
		} else {
			console.warn(this.is + ": Invalid value type [" + (typeof this.value) + "]");
		}
		return v;
	}

	// ==========================================================================================================================
	// Private
	// ==========================================================================================================================
	attached(){
		this.input = this.$$('#' + this._dashify(this.name));

		this.liHeight = this.$.list.children[0].clientHeight;
		this.exists;

		this.addEventListener('mousedown', (evt)=>{
			if(evt.target.localName=='ol' || evt.target.localName=='li') this.dontHide=true; else this.dontHide=false;
		});
		this.addEventListener('mouseup', (evt)=>{
			this.dontHide=false;
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
		this.set('value',this.options[newval]);
	}

	_updateValue(){
		let old = this.value;
		if(typeof this.value == 'object'){
			// this.input.value = this.value[this.labelField];
			this.highlightedElement();
			if(!this.preventChange){
				this.fire('change', { 'newValue': this.value, 'oldValue': old, 'externalChange': true});
			}
		}
	}



	/*----------
	UTILS & COMPUTED VALUES
	----------*/

	_viewLabel(label) {
		if(label.length > 0)
			return true;
		else
			return false;
	}

	_setDisabled(){
		this.disabled = this.noSearch;
	}

	_computeWrapperClass(open){
		let arr = ['elekti-wrapper',''];
		open ? arr[1] = 'active' : arr[1] = '';
		return arr.join(' ');
	}

	_computeInputClass(type){
		return ['js-users-list-filter',type].join(' ');
	}

	_computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}

	_dashify(str){
		return str.replace(/ /g,'-');
	}

	getIndex(value){
		let n;
		this.options.forEach(opt => {
			opt.value == value ? n = this.options.indexOf(opt) : null;
		});
		return n;
	}

	highlightedElement(input, els){
		console.log('highlightedElement: ', this.value);
		console.log('highlightedElement: ' + this.isNotValorized() + "; " + this.labelField);

		if(!input && this.isNotValorized()) return false;

		let search = (input)? input : this.value[this.labelField].toLowerCase();
		let elems = (els)? els : this.$.list.querySelectorAll('li');
		let exists=false;

		Array.from(elems).forEach(el => {
			let str = el.innerHTML;
			if((search !== '') && (str.toLowerCase() === search) ) {
				el.classList.add('selected');
				exists=true;
			} else {
				el.classList.remove('selected');
			}
		});

		return exists;
	}

	slideToggle(action){
		if (this.liHeight === undefined || this.liHeight == 0){
			this.liHeight = this.$.list.children[0].clientHeight;
		}
		if(action==='open'){
			console.log(this.$);
			this.$.list.classList.add('visible');
			let n= this.$.list.querySelectorAll('li.hide').length;
			this.$.list.style.height = (this.liHeight * (this.options.length-n)) + "px";
		} else {
			this.$.list.classList.remove('visible');
			this.$.list.style.height = "0px";
			Array.from(this.$.list.querySelectorAll('li')).forEach((el)=>{
				el.classList.remove('hide');
			});
		}
	}


	/*----------
	EVENT HANDLERS
	----------*/

	_handleFocusAndBlur(evt){
		if(evt.type=='focus'){
			if(!this.open){
				this.input.classList.add('active');
				setTimeout(() => {
					this.slideToggle('open');
					this.open = true;
					this.highlightedElement();
				},150);
			}
		} else if(this.dontHide && evt.type=='blur'){
			this.input.focus();
		} else if(!this.dontHide && evt.type=='blur') {
			this.input.classList.remove('active');
			setTimeout(() => {
				this.slideToggle('close');
				this.open = false;
			},150);
		}
	}

	_selectElement(evt, value){
		// let i = this.getIndex(evt.target.getAttribute('data-value'));
		let i = parseInt(evt.target.getAttribute('data-index'));
		let old = this.value;
		this.input.value = this.options[i][this.labelField];
		this.value = this.options[i];
		this.highlightedElement();

		if(!this.preventChange){
				this.fire('change', { 'newValue': this.value, 'oldValue': old});
		}
		this.input.blur();
	}

	_searchElement(evt){
		if(evt.keyCode==13 && this.exists){
			this.input.blur();
			return;
		}

		let elems = this.$.list.querySelectorAll('li');
		this.$.list.style.height = (this.liHeight*elems.length) + 'px';
		let input = this.input.value.toLowerCase();

		Array.from(elems).forEach(el => {
			let str = el.innerHTML;
			if(str.toLowerCase().search(input) == -1){
				el.classList.add('hide');
			} else {
				el.classList.remove('hide');
			}
		});

		let unMatchedOpt = this.$.list.querySelectorAll('li.hide');
		this.$.list.style.height = ((elems.length - unMatchedOpt.length) * this.liHeight) + "px";

		if( unMatchedOpt.length === elems.length ){
			this.$.noRes.classList.remove('hide');
			this.$.list.style.height = this.liHeight + "px";
		} else {
			this.$.noRes.classList.add('hide');
		}

		this.exists=this.highlightedElement(input, elems);
	}

	_computeValue(option) {
		console.log('_computeValue', option);
		console.log('_computeValue: ' + this.valueField + "; " + option[this.valueField]);
		return option[this.valueField];
	}

	_computeLabel(option) {
		console.log('_computeLabel', option);
		console.log('_computeLabel: ' + this.labelField + "; " + option[this.labelField]);
		return option[this.labelField];
	}
}



Polymer(ElektiMer);
