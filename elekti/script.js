Polymer({
	is: 'elekti-mer',
	properties: {
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
			notify: true
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
	},
	ready: function(){
		var thisComp = this;
		this.input = this.$$('#' + this.dashify(this.name));
		var n = this._searchKey(this.default)
		if((this.default || this.default === 0) && (typeof n == 'number')){
			thisComp.input.value = thisComp.options[n].label;
			thisComp.value = thisComp.options[n].value;
			thisComp.activeInput('blur');
		};
		this.value = this.input.value;
	},
	_searchKey: function(key){
		var n;
		var thisComp = this;
		for(var i = 0; i < thisComp.options.length; i++){
			(thisComp.options[i].value === key) ? n = i : null;
		}
		return n;
	},
	_computeWrapperClass: function(open){
		var arr = ['elekti-wrapper',''];
		open ? arr[1] = 'active' : arr[1] = '';
		return arr.join(' ');
	},
	dashify: function(str){
		return str.replace(/ /g,'-');
	},
	updateValue: function(){
		// this.value = this.input.value;
	},
	highlightedElement: function(){
		var search = this.input.value.toLowerCase();
		var elems = this.$.list.querySelectorAll('li');
		for(var i = 0; i < elems.length; i++){
			var str = elems[i].innerHTML;
			((search !== '') && (str.toLowerCase() === search) ) ? elems[i].classList.add('selected') : elems[i].classList.remove('selected');
		}
	},
	activeInput: function(type){
		if(type === 'blur' && this.input.value !== ""){
			this.input.classList.add('active');
		}else{
			this.input.classList.remove('active');
		}
	},
	selectElement: function(evt){
		this.input.value = evt.target.innerHTML;
		var i = this._getValue(evt.target.getAttribute('data-value'))
		this.value = this.options[i];
		this.activeInput('blur');
		this.fire('change');
	},
	_getValue: function(value){
		var n;
		for(var i = 0; i < this.options.length; i++){
			(this.options[i].value == value) ? n = i : null;
		}
		return n;
	},
	handleListVisibility: function(evt){
		this.input.classList.add('active');
		var thisComp = this;
		setTimeout(function(){
			this._slideToggle();
			this.open = this.$.list.classList.contains('visible');
			this.highlightedElement();
		}.bind(this),150);
		this.activeInput(evt.type);
	},
	_slideToggle : function(){
		this.$.list.classList.toggle('visible');
		if(this.$.list.classList.contains('visible')){
			this.$.list.style.height = (44 * this.options.length) + "px";
		}else{
			this.$.list.style.height = "0px"
		}
	},
	dropOnly: function(){
		if(this.noSearch){
			this._slideToggle();
			this.highlightedElement();
		}
	},
	searchElement: function(e){
		var search = this.input.value.toLowerCase();
		var elems = this.$.list.querySelectorAll('li');
		for(var i = 0; i < elems.length; i++){
			var str = elems[i].innerHTML;
			(str.toLowerCase().search(search) == -1) ? elems[i].classList.add('hide') : elems[i].classList.remove('hide');
		}
		var results = this.$.list.querySelectorAll('li.hide');
		( results.length === elems.length ) ? this.$.noRes.classList.remove('hide') : this.$.noRes.classList.add('hide');
		this.highlightedElement();
	},
	_viewLabel: function(label) {
		if(label.length > 0){
			return true;
		} else {
			return false;
		}
	}
});