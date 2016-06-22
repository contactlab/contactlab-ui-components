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
					value: null,
					reflectToAttribute: true
				},
				icon: {
					type: String,
					value: null,
					reflectToAttribute: true
				},
				name: {
					type: String,
					value: 'textinput',
					reflectToAttribute: true
				},
				type: {
					type: String,
					value: null,
					reflectToAttribute: true
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
					observer: '_disabledChanged',
					reflectToAttribute: true
				},
				inline: {
					type: Boolean,
					value: false,
					reflectToAttribute: true
				},
				labelSize: {
					type: String,
					value: null
				},
				placeholder: {
					type: String,
					reflectToAttribute: true
				},
				check: {
					type: Boolean,
					value: false
				},
				required: {
					type: Boolean,
					value: false,
					reflectToAttribute: true
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
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			Array.prototype.map.call(this.getEffectiveChildren(), function (node) {
				if (node.classList.contains('note')) {
					Polymer.dom(_this.$$('note-clab')).appendChild(node);
					Polymer.dom.flush();
				}
			});
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