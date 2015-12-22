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
					type: String
				},
				value: {
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
					}, 50);
					return;
				}
				this.querySelector('.options-list').classList.toggle('active');
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
			this.set('value', item);

			if (this.resultAsObj) this.fire('change', { 'newValue': this.value });else this.fire('change', { 'newValue': this.value.label });
		}
	}, {
		key: '_highlightEl',
		value: function _highlightEl(i) {
			Array.from(this.querySelectorAll('.options-list li')).forEach(function (el) {
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
				_this3.options = resp;
				//this.liHeight = this.$.list.children[0].clientHeight;
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
		key: '_compValueWrapper',
		value: function _compValueWrapper(disabled) {
			var arr = ['value_wrapper'];
			if (disabled) arr.push('disabled');
			return arr.join(' ');
		}

		/*---------- 
  UTILS
  ----------*/

	}, {
		key: '_getIndex',
		value: function _getIndex(item, items) {
			return items.indexOf(item);
		}
	}, {
		key: '_viewValue',
		value: function _viewValue(val) {
			if (val.hasOwnProperty('label')) return true;else return false;
		}
	}, {
		key: '_viewLabel',
		value: function _viewLabel(label) {
			if (label.length > 0) return true;else return false;
		}
	}, {
		key: '_setMaxHeight',
		value: function _setMaxHeight() {
			this.liHeight = this.querySelectorAll('.options-list li')[0].clientHeight;
			this.querySelector('.options-list').style.maxHeight = this.liHeight * this.maxInView + 'px';
		}
	}]);

	return DropdownClab;
})();

Polymer(DropdownClab);