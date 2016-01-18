'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
				options: {
					type: Array,
					value: [{ value: 'A', label: 'Option 1' }, { value: 'B', label: 'Option 2' }]
				},
				optionsFn: {
					type: Function,
					observer: '_setOptions'
				},
				placeholder: {
					type: String,
					value: 'Select..'
				},
				disabled: {
					type: Boolean,
					value: false
				},
				resultAsObj: {
					type: Boolean,
					value: false
				},
				// How many LIs are visible without scrolling (=> sets max-height of OL)
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
		key: 'attached',
		value: function attached() {
			var _this = this;

			this.addEventListener('mousedown', function (evt) {
				if (evt.target.localName == 'ol' || evt.target.localName == 'li') _this.dontHide = true;else _this.dontHide = false;
			});
			this.addEventListener('mouseup', function (evt) {
				_this.dontHide = false;
			});

			if (this.selected != undefined) this._setValue(this.selected);
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_toggleList',
		value: function _toggleList(evt) {
			var _this2 = this;

			if (!this.disabled) {
				if (this.liHeight == null) {
					this.querySelector('.options-list').classList.add('hidden');
					this._setMaxHeight();
					setTimeout(function () {
						_this2.querySelector('.options-list').classList.remove('hidden');
						_this2.querySelector('.options-list').classList.add('active');
						_this2.querySelector('.value_wrapper > span').classList.add('active');
					}, 50);
					return;
				}
				this.querySelector('.options-list').classList.toggle('active');
				this.querySelector('.value_wrapper > span').classList.toggle('active');
			}
		}
	}, {
		key: '_handleBlur',
		value: function _handleBlur(evt) {
			if (!this.dontHide) this.querySelector('.options-list').classList.remove('active');
		}
	}, {
		key: '_setThis',
		value: function _setThis(evt) {
			var i = evt.target.getAttribute('data-index');
			this._setValue(this.options[i]);
			this._highlightEl(i);
			this._toggleList();
		}

		/*----------
  FUNCTIONS
  ----------*/

	}, {
		key: '_setValue',
		value: function _setValue(item) {
			var old = this.selected;
			this.set('selected', item);
			this._highlightEl(this._getIndex(item, this.options));

			if (this.resultAsObj) this.fire('change', { 'selected': this.selected });else this.fire('change', { 'selected': this.selected.label });
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
			if (def != undefined) arr.push(def);
			if (disabled) arr.push('disabled');
			if (type != undefined) arr.push(type);
			return arr.join(' ');
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
			return this.selected.label;
		}
	}, {
		key: 'getSelectedValue',
		value: function getSelectedValue() {
			return this.selected.value;
		}
	}, {
		key: 'setByLabel',
		value: function setByLabel(str) {
			var _this4 = this;

			this.options.map(function (opt) {
				if (opt.label === str) {
					_this4._setValue(opt);
				}
			});
		}
	}, {
		key: 'setByValue',
		value: function setByValue(str) {
			var _this5 = this;

			this.options.map(function (opt) {
				if (opt.value === str) {
					_this5._setValue(opt);
				}
			});
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