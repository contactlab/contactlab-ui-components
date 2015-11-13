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
				ttId: String,
				ttTitle: String,
				ttContent: String,
				fixed: {
					type: Boolean,
					value: true
				},
				titleIsHtml: {
					type: Boolean,
					value: false
				},
				contentIsHtml: {
					type: Boolean,
					value: false
				},
				shownOn: {
					type: String,
					value: "mouseover"
				},
				hideOn: {
					type: String,
					value: "mouseleave"
				},
				tipJoint: {
					type: String,
					value: "top left"
				}
			};
		}
	}, {
		key: "ready",
		value: function ready() {
			var tt = new Opentip('#' + this.ttId, this.ttContent, this.ttTitle, {
				tipJoint: this.tipJoint,
				fixed: this.fixed,
				showOn: this.shownOn,
				hideOn: this.hideOn
			});
			console.log(tt);

			/*this.querySelector('#'+this.ttId).setAttribute('data-ot', this.ttContent);
   this.querySelector('#'+this.ttId).setAttribute('data-ot-title', this.ttTitle);		
   this.querySelector('#'+this.ttId).setAttribute('data-ot-fixed', this.fixed);*/
		}
	}]);

	return TooltipClab;
})();

Polymer(TooltipClab);