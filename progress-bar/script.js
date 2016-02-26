'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgressClab = function () {
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
				type: {
					type: String,
					value: null
				}
			};
		}

		/*---------- 
  COMPUTED
  ----------*/

	}, {
		key: '_computeProp',
		value: function _computeProp(value) {
			return 'width:' + this.value + '%;';
		}
	}, {
		key: '_computeClass',
		value: function _computeClass(minimal, type) {
			var arr = ['progress-bar'];
			if (minimal) arr.push('minimal');
			if (type != null) arr.push(type);
			return arr.join(' ');
		}

		/*---------- 
  UTILS
  ----------*/

	}, {
		key: '_percent',
		value: function _percent(value) {
			return value + '%';
		}
	}]);

	return ProgressClab;
}();

Polymer(ProgressClab);