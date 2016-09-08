'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DropdownClab = function () {
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
				icon: {
					type: String,
					value: ''
				},
				type: {
					type: String,
					value: ''
				},
				noteType: {
					type: String
				},
				selected: {
					type: Object,
					value: {}
				},
				highlighted: Object,
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
				inline: {
					type: Boolean,
					value: false
				},
				labelSize: {
					type: String,
					value: ''
				},
				placeholder: {
					type: String,
					value: 'Select..'
				},
				disabled: {
					type: Boolean,
					value: false
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
				maxHeight: {
					type: Number,
					value: 28
				}
				/*_liHeight:{
    	type:String,
    	value:null,
    	readonly: true
    }*/
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			if (this.id === undefined || this.id.length < 1) {
				var id = '';
				var possible = "abcdefghijklmnopqrstuvwxyz";
				var n = Math.floor(Math.random() * (999 - 0) + 0);
				var time = Date.now();
				for (var i = 0; i < 2; i++) {
					id += possible.charAt(Math.floor(Math.random() * possible.length));
				}id += n;
				id += time;
				this.id = id;
			}
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_toggleList',
		value: function _toggleList(evt) {
			var _this = this;

			if (!this.disabled) {
				this.$.curtain.open = !this.$.curtain.open;
				this.querySelector('.value_wrapper').classList.toggle('active');
			}

			var windowClick = function windowClick(evt) {
				var name = evt.target.localName;
				var hasClass = evt.target.classList.contains('curtain-clab');
				var hasIdentity = evt.target.classList.contains(_this.id);

				if (name == 'ol' && hasClass) {
					return;
				} else if (name == 'li' && hasClass || name == 'span' && evt.target.parentNode.classList.contains(_this.id) || name == 'div' && hasIdentity) {
					window.removeEventListener('mousedown', windowClick);
					return;
				} else {
					_this.$.curtain.open = false;
					_this.querySelector('.value_wrapper').classList.remove('active');
					window.removeEventListener('mousedown', windowClick);
				}
			};
			window.addEventListener('mousedown', windowClick);
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(evt) {
			this._setSelected(this.options[evt.detail.index]);
		}
	}, {
		key: '_handleHighlight',
		value: function _handleHighlight(evt) {
			this.set('highlighted', this.options[evt.detail.index]);
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
		key: '_setSelected',
		value: function _setSelected(item) {
			var old = this.selected;
			this.set('selected', item);
			this.set('highlighted', item);
			this.$.curtain.open = false;
			this.querySelector('.value_wrapper').classList.remove('active');

			if (!this.preventChange) {
				if (this.resultAsObj) this.fire('change', { 'selected': this.selected, 'newValue': this.selected, 'oldValue': old });else this.fire('change', { 'selected': this.selected[this.valueField], 'newValue': this.selected, 'oldValue': old });
			}
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
			if (newv != undefined) this._fetchOptions();
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: '_viewValue',
		value: function _viewValue(val, label) {
			if (val && val[label]) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: '_compIcon',
		value: function _compIcon(icon) {
			if (icon != undefined && icon.length > 0) return 'clab-icon ' + icon;else return '';
		}
	}, {
		key: '_compWrapperType',
		value: function _compWrapperType(str, disabled, type, inline, labelSize) {
			var arr = [str];
			if (disabled) arr.push('disabled');
			if (type != undefined && type.length > 0) arr.push(type);
			if (inline) {
				arr.push('inline');
				if (labelSize.length > 0) arr.push(labelSize + '-label');
			}
			return arr.join(' ');
		}
	}, {
		key: '_compType',
		value: function _compType(str, disabled, type, id) {
			var arr = [];
			if (str != undefined && str.length > 0) arr.push(str);
			if (id != undefined && id.length > 0) arr.push(id);
			if (disabled) arr.push('disabled');
			if (type != undefined && type.length > 0) arr.push(type);
			return arr.join(' ');
		}
	}, {
		key: '_compValue',
		value: function _compValue(option) {
			return option ? option[this.valueField] : '';
		}
	}, {
		key: '_compLabel',
		value: function _compLabel(option) {
			return option ? option[this.labelField] : '';
		}
	}, {
		key: '_compMaxHeight',
		value: function _compMaxHeight(height) {
			return height ? height : '';
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior, DropdownBehavior];
		}
	}]);

	return DropdownClab;
}();

Polymer(DropdownClab);