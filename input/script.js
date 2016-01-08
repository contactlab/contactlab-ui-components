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
				value: {
					type: String,
					notify: true,
					reflectToAttribute: true
				},
				disabled: {
					type: Boolean,
					value: false,
					observer: 'disabledChanged'
				},
				placeholder: {
					type: String
				},
				note: {
					type: String
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

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: 'disabledChanged',
		value: function disabledChanged(newVal, oldVal) {
			if (newVal) this.type = 'disabled';
		}

		/*----------
  COMPUTE
  ----------*/

	}, {
		key: 'computeNoteType',
		value: function computeNoteType(type, noteType) {
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
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return InputClab;
})();

Polymer(InputClab);