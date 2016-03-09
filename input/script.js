'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputClab = (function () {
	function InputClab() {
		_classCallCheck(this, InputClab);
	}

	_createClass(InputClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "input-clab";
			this.properties = {
				label: {
					type: String
				},
				name: {
					type: String,
					value: 'textinput'
				},
				type: {
					type: String,
					value: ''
				},
				password: {
					type: Boolean,
					value: false
				},
				check: {
					type: Boolean,
					value: false
				},
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
				placeholder: {
					type: String
				},
				noteType: {
					type: String,
					value: ''
				},
				btnConfig: {
					type: Object,
					value: {
						show: {
							icon: 'clab-icon icon-switch-off',
							label: 'Mostra password',
							type: "primary",
							appearance: "flat",
							size: ""
						},
						hide: {
							icon: 'clab-icon icon-switch-on',
							label: 'Nascondi password',
							type: "error",
							appearance: "flat",
							size: ""
						}
					}
				},

				btnProps: {
					type: String,
					computed: '_computeToggleBtnProps(password, btnConfig)'
				},
				compNoteType: {
					type: String,
					computed: '_computeNoteType(type, noteType)'
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
		key: '_computeNoteType',
		value: function _computeNoteType(type, noteType) {
			return [type, noteType].join(' ');
		}
	}, {
		key: '_computeDataType',
		value: function _computeDataType(password) {
			if (password) {
				return 'password';
			} else {
				return 'text';
			}
		}
	}, {
		key: '_computeToggleBtnProps',
		value: function _computeToggleBtnProps(pswd, btnConfig) {
			if (pswd) return btnConfig.show;else return btnConfig.hide;
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return InputClab;
})();

Polymer(InputClab);