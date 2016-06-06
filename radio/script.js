'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RadioClab = function () {
	function RadioClab() {
		_classCallCheck(this, RadioClab);
	}

	_createClass(RadioClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "radio-clab";
			this.properties = {
				labels: Array,
				name: String,
				wrapperType: {
					type: String,
					value: ''
				},
				active: Number,
				disabled: Array
			};
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: '_computeType',
		value: function _computeType(wt) {
			return ['row', wt].join(' ');
		}

		/*----------
  UTILS
  ----------*/

	}, {
		key: '_checkIfTrue',
		value: function _checkIfTrue(i, n) {
			switch (typeof n === 'undefined' ? 'undefined' : _typeof(n)) {
				case 'number':
					return i == n;
					break;
				case 'object':
					for (var x = 0; x < n.length; x++) {
						if (i == n[x]) return true;
					}
					break;
			}
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return RadioClab;
}();

Polymer(RadioClab);