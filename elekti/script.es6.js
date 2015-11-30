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
				type: 'Object',
				reflectToAttribute: true,
				notify: true,
				observer: '_updateValue'
			},
			open: {
				type: Boolean,
				value: false,
				readonly: true
			},
			noSearch: {
				type: Boolean,
				value: false
			},
			noResults: {
				type: String,
				value: 'No results found'
			},
			optionsFn: {
				type: Function,
				observer: '_setOptions'
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

		this.$$('.input-wrapper').addEventListener('mousedown', (evt)=>{
			if(evt.target.localName=='ol') this.dontHide=true; else this.dontHide=false;
		});
		this.$$('.input-wrapper').addEventListener('mouseup', (evt)=>{
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

	_updateValue(){
		if(typeof this.value == 'object'){
			this.input.value = this.value.label;
			this.highlightedElement();
		}
	}



	/*---------- 
	UTILS & COMPUTED VALUES
	----------*/

	getIndex(value){
		let n;
		this.options.forEach(opt => {
			opt.value == value ? n = this.options.indexOf(opt) : null;
		});
		return n;
	}

	_computeWrapperClass(open){
		let arr = ['elekti-wrapper',''];
		open ? arr[1] = 'active' : arr[1] = '';
		return arr.join(' ');
	}

	_dashify(str){
		return str.replace(/ /g,'-');
	}

	activeInput(type){
		if(type === 'blur' && this.input.value !== "")
			this.input.classList.add('active');
		else
			this.input.classList.remove('active');
	}

	_viewLabel(label) {
		if(label.length > 0)
			return true;
		else 
			return false;
	}

	highlightedElement(){
		let search = this.input.value.toLowerCase();
		let elems = this.$.list.querySelectorAll('li');
		Array.from(elems).forEach(el => {
			let str = el.innerHTML;
			((search !== '') && (str.toLowerCase() === search) ) ? el.classList.add('selected') : el.classList.remove('selected');
		});
	}

	slideToggle(action){
		if(action==='open'){
			this.$.list.classList.add('visible');
			let n= this.$.list.querySelectorAll('li.hide').length;
			this.$.list.style.height = (this.liHeight * (this.options.length-n)) + "px";
		} else {
			this.$.list.classList.remove('visible');
			this.$.list.style.height = "0px";
		}
		/*this.$.list.classList.toggle('visible');
		if(this.$.list.classList.contains('visible'))
			this.$.list.style.height = (this.liHeight * this.options.length) + "px";
		else
			this.$.list.style.height = "0px";*/
	}

	/*_dropOnly(){
		if(this.noSearch){
			this.slideToggle();
			this.highlightedElement();
		}
	}*/




	/*---------- 
	EVENT HANDLERS
	----------*/

	_selectElement(evt){
		let old = this.value;
		this.input.value = evt.target.innerHTML;
		let i = this.getIndex(evt.target.getAttribute('data-value'));
		this.value = this.options[i];
		this.activeInput('blur');
		this.fire('change', { 'newValue': this.value, 'oldValue': old});
		this._handleListVisibility(evt);
	}

	_handleListVisibility(evt){
		if(evt.type=='focus'){
			this.input.classList.add('active');
			setTimeout(() => {
				this.slideToggle('open');
				this.open = true;
				this.highlightedElement();
			},150);
		} else if(this.dontHide){
			this.input.focus();
		} else if(!this.dontHide) {
			this.input.classList.remove('active');
			setTimeout(() => {
				this.slideToggle('close');
				this.open = false;
			},150);
		}
	}

	_searchElement(evt){
		let search = this.input.value.toLowerCase();
		let elems = this.$.list.querySelectorAll('li');
		this.$.list.style.height = (this.liHeight*elems.length) + 'px';
		let height = this.$.list.clientHeight;

		Array.from(elems).forEach(el => {
			let str = el.innerHTML;
			if(str.toLowerCase().search(search) == -1){
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