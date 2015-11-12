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
		key: 'computeProp',
		value: function computeProp(value) {
			return 'width:' + this.value + '%;';
		}
	}, {
		key: 'computeClass',
		value: function computeClass(minimal, color) {
			var vals = ['minimal', 'primary', 'secondary', 'info', 'success', 'warning', 'error'];
			var classes = ['progress-bar'];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = arguments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var a = _step.value;

					a ? classes.push(vals[i]) : null;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return classes.join(' ');
		}
	}, {
		key: 'percent',
		value: function percent(value) {
			return value + '%';
		}
	}]);

	return ProgressClab;
})();

Polymer(ProgressClab);