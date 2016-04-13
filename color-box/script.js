"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorBox = function () {
	function ColorBox() {
		_classCallCheck(this, ColorBox);
	}

	_createClass(ColorBox, [{
		key: "beforeRegister",
		value: function beforeRegister() {
			this.is = "color-box";
			this.properties = {
				label: {
					type: String,
					value: "Color Name"
				},
				hex: {
					type: String,
					value: "000000"
				}
			};
		}
	}, {
		key: "behaviors",
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return ColorBox;
}();

Polymer(ColorBox);