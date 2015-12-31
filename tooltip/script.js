"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TooltipClab = (function () {
	function TooltipClab() {
		_classCallCheck(this, TooltipClab);
	}

	_createClass(TooltipClab, [{
		key: "beforeRegister",
		value: function beforeRegister() {
			this.is = "tooltip-clab";
			this.properties = {
				content: {
					type: String,
					value: 'The content'
				},
				type: {
					type: String,
					value: ""
				},
				ttType: {
					type: String,
					value: ""
				}
			};
		}

		/*---------- 
  EVENT HANDLERS
  ----------*/

	}, {
		key: "_handleHover",
		value: function _handleHover(evt) {
			document.querySelector('.kawo-tooltip').className = 'kawo-tooltip';
			document.querySelector('.kawo-tooltip-arrow').className = 'kawo-tooltip-arrow';
			if (this.ttType) {
				document.querySelector('.kawo-tooltip').classList.add(this.ttType);
				document.querySelector('.kawo-tooltip-arrow').classList.add(this.ttType);
			}
		}

		/*---------- 
  COMPUTED
  ----------*/

	}, {
		key: "_computeBtnClass",
		value: function _computeBtnClass(type) {
			return ['tooltip', type].join(' ');
		}
	}]);

	return TooltipClab;
})();

Polymer(TooltipClab);