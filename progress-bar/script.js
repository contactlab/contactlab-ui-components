'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressClab = (function () {
	function ProgressClab() {
		_classCallCheck(this, ProgressClab);
	}

	_createClass(ProgressClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'progress-clab';
			this.properties = {
				value: {
					type: Number,
					value: 0
				},
				minimal: {
					type: Boolean,
					value: false
				},
				primary: {
					type: Boolean,
					value: false
				},
				secondary: {
					type: Boolean,
					value: false
				},
				info: {
					type: Boolean,
					value: false
				},
				success: {
					type: Boolean,
					value: false
				},
				warning: {
					type: Boolean,
					value: false
				},
				error: {
					type: Boolean,
					value: false
				}
			};
		}
	}, {
		key: '_computeProp',
		value: function _computeProp(value) {
			return 'width:' + this.value + '%;';
		}
	}, {
		key: '_computeClass',
		value: function _computeClass(minimal, color) {
			var vals = ['minimal', 'primary', 'secondary', 'info', 'success', 'warning', 'error'];
			var classes = ['progress-bar'];
			for (var i = 0; i < arguments.length; i++) {
				arguments[i] ? classes.push(vals[i]) : null;
			}
			return classes.join(' ');
		}
	}, {
		key: '_percent',
		value: function _percent(value) {
			return value + '%';
		}
	}]);

	return ProgressClab;
})();

Polymer(ProgressClab);