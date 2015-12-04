'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElektiMer = (function () {
	function ElektiMer() {
		_classCallCheck(this, ElektiMer);
	}

	_createClass(ElektiMer, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "elekti-mer";
			this.properties = {
				label: {
					type: String
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
					value: [{ value: 'A', label: 'Option 1' }, { value: 'B', label: 'Option 2' }]
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
				disabled: {
					type: Boolean,
					value: false,
					notify: true,
					reflectToAttribute: true,
					observer: 'disabledChanged'
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
				},
				noteType: {
					type: String,
					value: ''
				},

				compNoteType: {
					type: String,
					computed: 'computeNoteType(type, noteType)'
				}
			};
		}
	}, {
		key: 'ready',
		value: function ready() {
			this.input = this.$$('#' + this._dashify(this.name));
			var i = this.getIndex(this.default);
			if ((this.default || this.default === 0) && typeof i == 'number') {
				this.input.value = this.options[i].label;
				this.value = this.options[i];
				//this.activeInput('blur');
			}
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this.liHeight = this.$.list.children[0].clientHeight;
			this.addEventListener('mousedown', function (evt) {
				if (evt.target.localName == 'ol') _this.dontHide = true;else _this.dontHide = false;
			});
			this.addEventListener('mouseup', function (evt) {
				_this.dontHide = false;
			});
		}

		/*---------- 
  OBSERVERS
  ----------*/

	}, {
		key: '_setOptions',
		value: function _setOptions(promise) {
			var _this2 = this;

			promise().then(function (resp) {
				_this2.options = resp;
				_this2.liHeight = _this2.$.list.children[0].clientHeight;
			});
		}
	}, {
		key: '_updateValue',
		value: function _updateValue() {
			if (_typeof(this.value) == 'object') {
				this.input.value = this.value.label;
				this.highlightedElement();
			}
		}
	}, {
		key: 'disabledChanged',
		value: function disabledChanged(newVal, oldVal) {
			if (newVal) this.type = 'disabled';
		}

		/*---------- 
  UTILS & COMPUTED VALUES
  ----------*/

	}, {
		key: 'getIndex',
		value: function getIndex(value) {
			var _this3 = this;

			var n = undefined;
			this.options.forEach(function (opt) {
				opt.value == value ? n = _this3.options.indexOf(opt) : null;
			});
			return n;
		}
	}, {
		key: '_computeWrapperClass',
		value: function _computeWrapperClass(open) {
			var arr = ['elekti-wrapper', ''];
			open ? arr[1] = 'active' : arr[1] = '';
			return arr.join(' ');
		}
	}, {
		key: '_computeInputClass',
		value: function _computeInputClass(type) {
			return ['js-users-list-filter', type].join(' ');
		}
	}, {
		key: 'computeNoteType',
		value: function computeNoteType(type, noteType) {
			return [type, noteType].join(' ');
		}
	}, {
		key: '_dashify',
		value: function _dashify(str) {
			return str.replace(/ /g, '-');
		}
	}, {
		key: 'activeInput',
		value: function activeInput(type) {
			if (type === 'blur' && this.input.value !== "") this.input.classList.add('active');else this.input.classList.remove('active');
		}
	}, {
		key: '_viewLabel',
		value: function _viewLabel(label) {
			if (label.length > 0) return true;else return false;
		}
	}, {
		key: 'highlightedElement',
		value: function highlightedElement() {
			var search = this.input.value.toLowerCase();
			var elems = this.$.list.querySelectorAll('li');
			Array.from(elems).forEach(function (el) {
				var str = el.innerHTML;
				search !== '' && str.toLowerCase() === search ? el.classList.add('selected') : el.classList.remove('selected');
			});
		}
	}, {
		key: 'slideToggle',
		value: function slideToggle(action) {
			if (this.liHeight === undefined || this.liHeight == 0) {
				this.liHeight = this.$.list.children[0].clientHeight;
			}
			if (action === 'open') {
				this.$.list.classList.add('visible');
				var n = this.$.list.querySelectorAll('li.hide').length;
				this.$.list.style.height = this.liHeight * (this.options.length - n) + "px";
			} else {
				this.$.list.classList.remove('visible');
				this.$.list.style.height = "0px";
			}
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

	}, {
		key: '_selectElement',
		value: function _selectElement(evt, value) {
			var old = this.value;
			var i = this.getIndex(evt.target.getAttribute('data-value'));
			this.input.value = evt.target.innerHTML;
			/*if(!value){
   	i = this.getIndex(evt.target.getAttribute('data-value'));
   }
   else{
   	i = this.getIndex(value);
   }*/
			this.value = this.options[i];
			//this.activeInput('blur');
			this.fire('change', { 'newValue': this.value, 'oldValue': old });
			this._handleListVisibility(evt);
		}
	}, {
		key: '_handleListVisibility',
		value: function _handleListVisibility(evt) {
			var _this4 = this;

			if (evt.type == 'focus') {
				this.input.classList.add('active');
				setTimeout(function () {
					_this4.slideToggle('open');
					_this4.open = true;
					_this4.highlightedElement();
				}, 150);
			} else if (this.dontHide) {
				this.input.focus();
			} else if (!this.dontHide) {
				this.input.classList.remove('active');
				setTimeout(function () {
					_this4.slideToggle('close');
					_this4.open = false;
				}, 150);
			}
		}
	}, {
		key: '_searchElement',
		value: function _searchElement(evt) {
			var input = this.input.value.toLowerCase();
			var elems = this.$.list.querySelectorAll('li');
			this.$.list.style.height = this.liHeight * elems.length + 'px';

			if (evt.keyCode == 13) null;

			Array.from(elems).forEach(function (el) {
				var str = el.innerHTML;
				if (str.toLowerCase().search(input) == -1) {
					el.classList.add('hide');
				} else {
					el.classList.remove('hide');
				}
			});

			var unMatchedOpt = this.$.list.querySelectorAll('li.hide');
			this.$.list.style.height = (elems.length - unMatchedOpt.length) * this.liHeight + "px";

			if (unMatchedOpt.length === elems.length) {
				this.$.noRes.classList.remove('hide');
				this.$.list.style.height = this.liHeight + "px";
			} else {
				this.$.noRes.classList.add('hide');
			}
			this.highlightedElement();

			/*if(evt.keyCode==13){
   	() => {
   		Array.from(elems).forEach(el => {
   			let str = el.innerHTML;
   			console.log('searching: ',str.toLowerCase().search(input));
   			if(str.toLowerCase().search(input) != -1){
   				this._selectElement(evt, el.getAttribute('data-value'));
   				return;
   			}
   		});
   	}
   }*/
		}
	}]);

	return ElektiMer;
})();

Polymer(ElektiMer);