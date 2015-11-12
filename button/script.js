"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ButtonClab = (function () {
	function ButtonClab() {
		_classCallCheck(this, ButtonClab);
	}

	_createClass(ButtonClab, [{
		key: "beforeRegister",
		value: function beforeRegister() {
			this.is = 'button-clab';
			this.properties = {
				type: {
					type: String,
					value: ""
				},
				appearance: {
					type: String,
					value: ""
				},
				size: {
					type: String,
					value: ""
				},
				icon: {
					type: String,
					value: ""
				},
				disabled: {
					type: Boolean,
					value: false
				}
			};
		}
	}, {
		key: "_computeClass",
		value: function _computeClass(type, appearance, size) {
			return ['btn', type, appearance, size].join(' ');
		}
	}, {
		key: "_computeIconClass",
		value: function _computeIconClass(icon) {
			return ['icon', icon].join(' ');
		}
	}]);

	return ButtonClab;
})();

Polymer(ButtonClab);