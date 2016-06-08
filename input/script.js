'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputClab = function () {
	function InputClab() {
		_classCallCheck(this, InputClab);
	}

	_createClass(InputClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "input-clab";
			this.properties = {
				label: {
					type: String,
					value: null
				},
				icon: {
					type: String,
					value: null
				},
				name: {
					type: String,
					value: 'textinput'
				},
				type: {
					type: String,
					value: null
				},
				noteType: String,
				value: {
					type: String,
					notify: true,
					reflectToAttribute: true
				},
				disabled: {
					type: Boolean,
					value: false,
					observer: '_disabledChanged'
				},
				inline: {
					type: Boolean,
					value: false
				},
				labelSize: {
					type: String,
					value: null
				},
				placeholder: String,
				check: {
					type: Boolean,
					value: false
				},
				btnPswd: {
					type: Object,
					value: {
						show: {
							icon: '',
							label: 'Show',
							type: "",
							appearance: "",
							size: ""
						},
						hide: {
							icon: '',
							label: 'Hide',
							type: "",
							appearance: "",
							size: ""
						}
					}
				},
				_btnPswd: Object,
				password: {
					type: Boolean,
					value: false,
					observer: '_computeBtnPswd'
				}
			};
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_toggleInputType',
		value: function _toggleInputType(evt) {
			this.password = !this.password;
		}
	}, {
		key: '_btnclick',
		value: function _btnclick(evt) {
			this.fire('btnclick');
		}
	}, {
		key: '_blur',
		value: function _blur(evt) {
			this.fire('blur', { input: evt });
		}
	}, {
		key: '_focus',
		value: function _focus(evt) {
			this.fire('focus', { input: evt });
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: '_disabledChanged',
		value: function _disabledChanged(newVal, oldVal) {
			if (newVal) this.type = 'disabled';
		}

		/*----------
  COMPUTE
  ----------*/

	}, {
		key: '_compWrapperClass',
		value: function _compWrapperClass(str, type, inline, labelSize) {
			var arr = [str];
			if (type != null) arr.push(type);
			if (inline) {
				arr.push('inline');
				if (labelSize != null) arr.push(labelSize + '-label');
			}
			return arr.join(' ');
		}
	}, {
		key: '_compIcon',
		value: function _compIcon(icon) {
			if (icon != undefined) return 'clab-icon ' + icon;else return '';
		}
	}, {
		key: '_computeInputType',
		value: function _computeInputType(password) {
			if (password) {
				return 'password';
			} else {
				return 'text';
			}
		}
	}, {
		key: '_computeBtnPswd',
		value: function _computeBtnPswd(val, old) {
			if (val) this.set('_btnPswd', this.btnPswd.show);else this.set('_btnPswd', this.btnPswd.hide);
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return InputClab;
}();

Polymer(InputClab);