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
				value: [{value: 'A', label: 'Option 1'}
				,{value: 'B', label: 'Option 2'}]
			},
			default: {
				type: Number
			},
			value: {
				type: 'Object',
				/*readonly: true*/
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
			}
		}
	}


	ready(){
		let thisComp = this;
		this.input = this.$$('#' + this.dashify(this.name));
		let n = this._searchKey(this.default)
		if((this.default || this.default === 0) && (typeof n == 'number')){
			thisComp.input.value = thisComp.options[n].label;
			thisComp.value = thisComp.options[n].value;
			thisComp.activeInput('blur');
		};
		this.value = this.input.value;
	}

	_updateValue(){
		if(typeof this.value == 'object'){
			this.input.value = this.value.label;
			this.highlightedElement();
		}
	}

	_searchKey(key){
		let n;
		let thisComp = this;
		thisComp.options.forEach(opt => {
			(opt.value === key) ? n = thisComp.options.indexOf(opt) : null;
		});
		return n;
	}

	_computeWrapperClass(open){
		let arr = ['elekti-wrapper',''];
		open ? arr[1] = 'active' : arr[1] = '';
		return arr.join(' ');
	}

	dashify(str){
		return str.replace(/ /g,'-');
	}

	highlightedElement(){
		let search = this.input.value.toLowerCase();
		let elems = this.$.list.querySelectorAll('li');
		Array.from(elems).forEach(el => {
			let str = el.innerHTML;
			((search !== '') && (str.toLowerCase() === search) ) ? el.classList.add('selected') : el.classList.remove('selected');
		});
	}

	activeInput(type){
		if(type === 'blur' && this.input.value !== "")
			this.input.classList.add('active');
		else
			this.input.classList.remove('active');
	}

	selectElement(evt){
		this.input.value = evt.target.innerHTML;
		let i = this._getValue(evt.target.getAttribute('data-value'))
		this.value = this.options[i];
		this.activeInput('blur');
		this.fire('change');
	}

	_getValue(value){
		let n;
		this.options.forEach(opt => {
			opt.value == value ? n = this.options.indexOf(opt) : null;
		});
		return n;
	}

	handleListVisibility(evt){
		this.input.classList.add('active');
		let thisComp = this;
		setTimeout(() => {
			this._slideToggle();
			this.open = this.$.list.classList.contains('visible');
			this.highlightedElement();
		},150);
		this.activeInput(evt.type);
	}

	_slideToggle(){
		this.$.list.classList.toggle('visible');
		if(this.$.list.classList.contains('visible'))
			this.$.list.style.height = (44 * this.options.length) + "px";
		else
			this.$.list.style.height = "0px";
	}

	dropOnly(){
		if(this.noSearch){
			this._slideToggle();
			this.highlightedElement();
		}
	}

	searchElement(e){
		let search = this.input.value.toLowerCase();
		let elems = this.$.list.querySelectorAll('li');
		Array.from(elems).forEach(el => {
			let str = el.innerHTML;
			(str.toLowerCase().search(search) == -1) ? el.classList.add('hide') : el.classList.remove('hide');
		});
		let results = this.$.list.querySelectorAll('li.hide');
		( results.length === elems.length ) ? this.$.noRes.classList.remove('hide') : this.$.noRes.classList.add('hide');
		this.highlightedElement();
	}

	_viewLabel(label) {
		if(label.length > 0)
			return true;
		else 
			return false;
	}

}



Polymer(ElektiMer);