'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpinnerClab = (function () {
	function SpinnerClab() {
		_classCallCheck(this, SpinnerClab);
	}

	_createClass(SpinnerClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'spinner-clab';
			this.properties = {
				dark: {
					type: Boolean,
					value: false
				},
				big: {
					type: Boolean,
					value: false
				}
			};
		}
	}, {
		key: 'computeClass',
		value: function computeClass(big, dark) {
			var str = 'spinner-overlay ';
			this.dark ? str += ' dark ' : null;
			this.big ? str += ' big ' : null;
			return str;
		}
	}]);

	return SpinnerClab;
})();

Polymer(SpinnerClab);