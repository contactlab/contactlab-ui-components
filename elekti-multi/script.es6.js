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
			default: {
				type: String
			},
			placeholder: {
				type: String,
				value: 'Select...'
			},
			value: {
				type: Object,
				reflectToAttribute: true,
				notify: true
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
				value: false,
				notify: true,
				reflectToAttribute: true,
				observer: '_disabledChanged'
			},
			noSearch: {
				type: Boolean,
				value: false
			},
			noResults: {
				type: String,
				value: 'No results found'
			},
			multiSelect: {
				type: Boolean,
				value: false
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

	ready(){
		this.input = this.$$('#' + this._dashify(this.name));
		let i = this.getIndex(this.default);
		if((this.default || this.default === 0) && (typeof i == 'number')){
			this.input.value = this.options[i].label;
			this.value = this.options[i];
			//this.activeInput('blur');
		}
	}

	attached(){
		this.liHeight = this.$.list.children[0].clientHeight;
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

	_disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}

	/*_updateValue(evt){
		if(typeof this.value == 'object'){
			this.input.value = this.value.label;
			this.highlightedElement();
		}
	}*/



	/*---------- 
	UTILS & COMPUTED VALUES
	----------*/

	_viewLabel(label) {
		if(label.length > 0)
			return true;
		else 
			return false;
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

	/*activeInput(type){
		if(type === 'blur' && this.input.value !== "")
			this.input.classList.add('active');
		else
			this.input.classList.remove('active');
	}*/

	getIndex(value){
		let n;
		this.options.forEach(opt => {
			opt.value == value ? n = this.options.indexOf(opt) : null;
		});
		return n;
	}

	highlightedElement(){
		let search;
		if(this.multiSelect){
			search = this.input.value.toLowerCase().split(', ').pop();
		} else {
			search = this.input.value.toLowerCase();
		}
		let elems = this.$.list.querySelectorAll('li');
		Array.from(elems).forEach(el => {
			let str = el.innerHTML;
			((search !== '') && (str.toLowerCase() === search) ) ? el.classList.add('selected') : el.classList.remove('selected');
		});
	}

	slideToggle(action){
		if (this.liHeight === undefined || this.liHeight == 0){
			this.liHeight = this.$.list.children[0].clientHeight;
		}
		if(action==='open'){
			this.$.list.classList.add('visible');
			let n= this.$.list.querySelectorAll('li.hide').length;
			this.$.list.style.height = (this.liHeight * (this.options.length-n)) + "px";
		} else {
			this.$.list.classList.remove('visible');
			this.$.list.style.height = "0px";
		}
	}

	stampValues(){
		let values=[];
		for(let i=0; i<this.valuesArr.length; i++){
			values.push(this.valuesArr[i].label);
		}
		this.input.value = values.join(', ')+', ';
	}

	searchInArr(arr, key){
		for(let i=0; i<arr.length; i++){
			if(arr[i].label===key){
				return {is: true, arr: arr[i]};
			}
		}
		return {is: false};
	}


	/*---------- 
	EVENT HANDLERS
	----------*/

	_handleFocusAndBlur(evt){
		if(evt.type=='focus'){
			this.input.classList.add('active');
			setTimeout(() => {
				this.slideToggle('open');
				this.open = true;
				this.highlightedElement();
			},150);
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
		let i = this.getIndex(evt.target.getAttribute('data-value'));
		
		if(this.multiSelect){
			let old = this.valuesArr;
			this.valuesArr.push(this.options[i]);
			this.stampValues();

			this.fire('change', { 'newValue': this.valuesArr, 'oldValue': old});
		} else {
			let old = this.value;
			this.input.value = this.options[i].label;
			this.value = this.options[i];

			this.fire('change', { 'newValue': this.value, 'oldValue': old});
		}

		this.input.blur();
	}

	_searchElement(evt){
		let input;
		let elems = this.$.list.querySelectorAll('li');
		this.$.list.style.height = (this.liHeight*elems.length) + 'px';

		if(this.multiSelect){
			input = this.input.value.toLowerCase().split(', ').pop();

			//let lastOfInput= this.input.value.toLowerCase().split(', ').pop();
			/*console.log(input);
			if(input!=""){
				let existsInOptions=this.searchInArr(this.options, input);

				if(existsInOptions.is){
					let existsInValues=this.searchInArr(this.valuesArr, input);
					if(existsInValues.is){
						this.stampValues();
					} else {
						this.valuesArr.push(existsInOptions.arr);
						this.stampValues();
					}
				} else {
					this.valuesArr.pop();
					this.stampValues();
				}
				
			} else if(input==="" && this.input.value.split(', ').length>this.valuesArr.length) {
				
			}*/
		} else {
			input = this.input.value.toLowerCase();

		}

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
		this.highlightedElement();
	}
}



Polymer(ElektiMer);