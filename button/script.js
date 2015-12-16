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
				/**
         * `type` additional class for the type of btn
         * @type string
         */
				type: {
					type: String,
					value: ""
				},
				/**
         * `appearance` additional class for the appearence of btn
         * @type string
         */
				appearance: {
					type: String,
					value: ""
				},
				/**
         * `size` additional class for the size of btn
         * @type string
         */
				size: {
					type: String,
					value: ""
				},
				/**
         * `type` additional class for the icon of btn
         * @type string
         */
				icon: {
					type: String,
					value: ""
				},
				/**
         * Whether is disabled or not
         * @type boolean
         */
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