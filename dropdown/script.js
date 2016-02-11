'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropdownClab = (function () {
	function DropdownClab() {
		_classCallCheck(this, DropdownClab);
	}

	_createClass(DropdownClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "dropdown-clab";
			this.properties = {
				label: {
					type: String,
					value: null
				},
				type: {
					type: String,
					value: ''
				},
				selected: {
					type: Object,
					value: {}
				},
				valueField: {
					type: String,
					value: 'value'
				},
				labelField: {
					type: String,
					value: 'label'
				},
				options: {
					type: Array,
					value: [{ value: 'A', label: 'Option 1' }, { value: 'B', label: 'Option 2' }]
				},
				optionsFn: {
					type: Function,
					observer: '_setOptions'
				},
				url: {
					type: String,
					observer: '_observUrl'
				},
				placeholder: {
					type: String,
					value: 'Select..'
				},
				disabled: {
					type: Boolean,
					value: false
				},
				disableOption: {
					type: Array,
					value: []
				},
				preventChange: {
					type: Boolean,
					value: false
				},
				resultAsObj: {
					type: Boolean,
					value: false
				},
				maxInView: {
					type: Number,
					value: 4
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
				liHeight: {
					type: String,
					value: null,
					readonly: true
				}
			};
		}
	}, {
		key: 'ready',
		value: function ready() {
			if (this.url != undefined && this.url != null) {
				this._fetchOptions();
			}
		}
	}, {
		key: 'attached',
		value: function attached() {
			if (this.selected != undefined) this._setValue(this.selected);
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_toggleList',
		value: function _toggleList(evt) {
			var _this = this;

			if (!this.disabled) {
				if (this.liHeight == null) {
					this.querySelector('.options-list').classList.add('hidden');
					this._setMaxHeight();
					setTimeout(function () {
						_this.querySelector('.options-list').classList.remove('hidden');
						_this.querySelector('.options-list').classList.add('active');
						_this.querySelector('.value_wrapper > span').classList.add('active');
					}, 50);
				} else {
					this.querySelector('.options-list').classList.toggle('active');
					this.querySelector('.value_wrapper').classList.toggle('active');
				}
			}

			var windowClick = function windowClick(evt) {
				var name = evt.target.localName;
				var hasClass = evt.target.classList.contains('dropdown-clab');
				var hasIdentity = evt.target.classList.contains(_this.id);

				if (name == 'ol' && hasClass) {
					return;
				} else if (name == 'li' && hasClass || name == 'span' && evt.target.parentNode.classList.contains(_this.id) || name == 'div' && hasIdentity) {
					window.removeEventListener('mousedown', windowClick);
					return;
				} else {
					_this.querySelector('.options-list').classList.remove('active');
					_this.querySelector('.value_wrapper').classList.remove('active');
					window.removeEventListener('mousedown', windowClick);
				}
			};
			window.addEventListener('mousedown', windowClick);
		}
	}, {
		key: '_setThis',
		value: function _setThis(evt) {
			if (evt.target.getAttribute('data-disabled') === 'false') {
				var i = evt.target.getAttribute('data-index');

				this._setValue(this.options[i]);
				this._highlightEl(i);
				this.querySelector('.options-list').classList.remove('active');
				this.querySelector('.value_wrapper').classList.remove('active');
			}
		}

		/*----------
  METHODS	
  ----------*/

	}, {
		key: '_fetchOptions',
		value: function _fetchOptions() {
			var _this2 = this;

			fetch(this.url, {
				method: 'GET'
			}).then(function (res) {
				if (res.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + res.status);
					_this2.type = 'error';
					return;
				}

				res.json().then(function (data) {
					_this2.set('options', data);
				});
			}).catch(function (err) {
				console.error("Fetch Error ==> ", err);
				_this2.type = 'error';
			});
		}
	}, {
		key: '_setValue',
		value: function _setValue(item) {
			var old = this.selected;
			this.set('selected', item);
			this._highlightEl(this._getIndex(item, this.options));

			if (!this.preventChange) {
				if (this.resultAsObj) this.fire('change', { 'selected': this.selected });else this.fire('change', { 'selected': this.selected[this.valueField] });
			}
		}
	}, {
		key: '_highlightEl',
		value: function _highlightEl(i) {
			Array.prototype.map.call(this.querySelectorAll('.options-list li'), function (el) {
				if (el.getAttribute('data-index') == i) {
					el.classList.add('selected');
				} else {
					el.classList.remove('selected');
				}
			});
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: '_setOptions',
		value: function _setOptions(promise) {
			var _this3 = this;

			promise().then(function (resp) {
				_this3.set('options', resp);
			});
		}
	}, {
		key: '_observUrl',
		value: function _observUrl(newv, oldv) {
			if (oldv != undefined) this._fetchOptions();
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: '_computeNoteType',
		value: function _computeNoteType(type, noteType) {
			var arr = [];
			if (type != undefined) arr.push(type);
			if (noteType != undefined) arr.push(noteType);

			if (arr.length > 0) return arr.join(' ');
		}
	}, {
		key: '_compType',
		value: function _compType(disabled, type, def) {
			var arr = [];
			if (def != undefined) {
				arr.push(def);
				arr.push(this.id);
			}
			if (disabled) arr.push('disabled');
			if (type != undefined) arr.push(type);
			return arr.join(' ');
		}
	}, {
		key: '_computeValue',
		value: function _computeValue(option) {
			return option[this.valueField];
		}
	}, {
		key: '_computeLabel',
		value: function _computeLabel(option) {
			return option[this.labelField];
		}
	}, {
		key: '_computeDisabledLis',
		value: function _computeDisabledLis(arr, i) {
			var disable = 'false';
			arr.map(function (n) {
				if (n === parseInt(i)) {
					disable = 'true';
					return;
				}
			});
			return disable;
		}

		/*----------
  UTILS
  ----------*/

	}, {
		key: '_viewValue',
		value: function _viewValue(val) {
			if (val.hasOwnProperty('label')) return true;else return false;
		}
	}, {
		key: '_setMaxHeight',
		value: function _setMaxHeight() {
			this.liHeight = this.querySelectorAll('.options-list li')[0].clientHeight;
			this.querySelector('.options-list').style.maxHeight = this.liHeight * this.maxInView + 'px';
		}

		/*----------
  PUBLIC
  ----------*/

	}, {
		key: 'getSelectedLabel',
		value: function getSelectedLabel() {
			return this.selected[this.labelField];
		}
	}, {
		key: 'getSelectedValue',
		value: function getSelectedValue() {
			return this.selected[this.valueField];
		}
	}, {
		key: 'setByLabel',
		value: function setByLabel(str) {
			var _this4 = this;

			this.options.map(function (opt) {
				if (opt[_this4.labelField] === str) {
					_this4._setValue(opt);
					return;
				}
			});
		}
	}, {
		key: 'setByValue',
		value: function setByValue(str) {
			var _this5 = this;

			this.options.map(function (opt) {
				if (opt[_this5.valueField] === str) {
					_this5._setValue(opt);
					return;
				}
			});
		}
	}, {
		key: 'isValorized',
		value: function isValorized() {
			return !this.isNotValorized();
		}
	}, {
		key: 'isNotValorized',
		value: function isNotValorized() {
			return this.selected === undefined || this.selected === null || this.selected[this.valueField] === undefined || this.selected[this.valueField] === null;
		}
	}, {
		key: 'setValue',
		value: function setValue(obj, prevent) {
			var _this6 = this;

			console.log('RULE-HEADER.setValue(' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) + '): ', obj);
			prevent = prevent ? true : false;
			this.preventChange = prevent;

			if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
				this._setValue(obj);
				console.log('RULE-HEADER.setValue(obj): ', obj);
			} else {
				var realObj;
				this.options.map(function (opt) {
					if (opt[_this6.valueField] === obj) {
						_this6._setValue(opt);
						return;
					}
				});
			}

			this.preventChange = false;
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			var v;
			if (this.isNotValorized()) {
				v = undefined;
			} else if (typeof this.selected === 'string' || this.selected instanceof String) {
				v = this.selected;
			} else if (_typeof(this.selected) === "object") {
				v = this.selected[this.valueField];
			} else {
				console.error(this.is + ": Invalid value type [" + _typeof(this.selected) + "]");
			}
			return v;
		}
	}, {
		key: 'getValueObject',
		value: function getValueObject() {
			var _this7 = this;

			var v;
			if (this.isNotValorized(this.selected)) {
				v = undefined;
			} else if (typeof this.selected === 'string' || this.selected instanceof String) {
				this.options.map(function (opt) {
					if (opt[_this7.valueField] === _this7.selected) {
						v = opt;
						return;
					}
				});
				if (v === undefined) {
					console.warn(this.is + ": There is no option with value equal to [" + this.selected + "]");
				}
			} else if (_typeof(this.selected) === "object") {
				v = this.selected;
			} else {
				console.warn(this.is + ": Invalid value type [" + _typeof(this.selected) + "]");
			}
			return v;
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return DropdownClab;
})();

Polymer(DropdownClab);