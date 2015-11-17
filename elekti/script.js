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
				options: {
					type: Array,
					value: [{ value: 'A', label: 'Option 1' }, { value: 'B', label: 'Option 2' }]
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
				},
				optionsFn: {
					type: Function,
					observer: '_setOptions'
				}
			};
		}
	}, {
		key: 'ready',
		value: function ready() {
			var thisComp = this;
			this.input = this.$$('#' + this.dashify(this.name));
			var n = this._searchKey(this.default);
			if ((this.default || this.default === 0) && typeof n == 'number') {
				thisComp.input.value = thisComp.options[n].label;
				thisComp.value = thisComp.options[n].value;
				thisComp.activeInput('blur');
			};
			this.value = this.input.value;
		}
	}, {
		key: '_setOptions',
		value: function _setOptions(promise) {
			var _this = this;

			promise().then(function (resp) {
				_this.options = resp;
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
		key: '_searchKey',
		value: function _searchKey(key) {
			var n = undefined;
			var thisComp = this;
			thisComp.options.forEach(function (opt) {
				opt.value === key ? n = thisComp.options.indexOf(opt) : null;
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
		key: 'dashify',
		value: function dashify(str) {
			return str.replace(/ /g, '-');
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
		key: 'activeInput',
		value: function activeInput(type) {
			if (type === 'blur' && this.input.value !== "") this.input.classList.add('active');else this.input.classList.remove('active');
		}
	}, {
		key: 'selectElement',
		value: function selectElement(evt) {
			var old = this.value;
			this.input.value = evt.target.innerHTML;
			var i = this._getValue(evt.target.getAttribute('data-value'));
			this.value = this.options[i];
			this.activeInput('blur');
			this.fire('change', { 'newValue': this.value, 'oldValue': old });
		}
	}, {
		key: '_getValue',
		value: function _getValue(value) {
			var _this2 = this;

			var n = undefined;
			this.options.forEach(function (opt) {
				opt.value == value ? n = _this2.options.indexOf(opt) : null;
			});
			return n;
		}
	}, {
		key: 'handleListVisibility',
		value: function handleListVisibility(evt) {
			var _this3 = this;

			this.input.classList.add('active');
			var thisComp = this;
			setTimeout(function () {
				_this3._slideToggle();
				_this3.open = _this3.$.list.classList.contains('visible');
				_this3.highlightedElement();
			}, 150);
			this.activeInput(evt.type);
		}
	}, {
		key: '_slideToggle',
		value: function _slideToggle() {
			this.$.list.classList.toggle('visible');
			if (this.$.list.classList.contains('visible')) this.$.list.style.height = 44 * this.options.length + "px";else this.$.list.style.height = "0px";
		}
	}, {
		key: 'dropOnly',
		value: function dropOnly() {
			if (this.noSearch) {
				this._slideToggle();
				this.highlightedElement();
			}
		}
	}, {
		key: 'searchElement',
		value: function searchElement(e) {
			var search = this.input.value.toLowerCase();
			var elems = this.$.list.querySelectorAll('li');
			Array.from(elems).forEach(function (el) {
				var str = el.innerHTML;
				str.toLowerCase().search(search) == -1 ? el.classList.add('hide') : el.classList.remove('hide');
			});
			var results = this.$.list.querySelectorAll('li.hide');
			results.length === elems.length ? this.$.noRes.classList.remove('hide') : this.$.noRes.classList.add('hide');
			this.highlightedElement();
		}
	}, {
		key: '_viewLabel',
		value: function _viewLabel(label) {
			if (label.length > 0) return true;else return false;
		}
	}]);

	return ElektiMer;
})();

Polymer(ElektiMer);