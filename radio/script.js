'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RadioClab = (function () {
	function RadioClab() {
		_classCallCheck(this, RadioClab);
	}

	_createClass(RadioClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "radio-clab";
			this.properties = {
				labels: {
					type: Array
				},
				name: {
					type: String
				},
				wrapperType: {
					type: String,
					value: ''
				},
				active: {
					type: Number
				},
				disabled: {
					type: Array
				}
			};
		}
	}, {
		key: '_dashify',
		value: function _dashify(label) {
			return label.toLowerCase().replace(' ', '-');
		}
	}, {
		key: '_computeType',
		value: function _computeType(wt) {
			return ['row', wt].join(' ');
		}
	}, {
		key: '_checkIfTrue',
		value: function _checkIfTrue(i, n) {
			if (typeof n === 'number') {
				return i == n;
			} else if ((typeof n === 'undefined' ? 'undefined' : _typeof(n)) === 'object') {
				for (var x = 0; x < n.length; x++) {
					if (i == n[x]) return true;
				}
			}
		}
	}]);

	return RadioClab;
})();

Polymer(RadioClab);