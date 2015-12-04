'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardClab = (function () {
	function CardClab() {
		_classCallCheck(this, CardClab);
	}

	_createClass(CardClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "card-clab";
			this.properties = {
				title: {
					type: String,
					value: 'Title'
				},
				primaryLabel: {
					type: String,
					value: 'OK'
				},
				secondaryLabel: {
					type: String,
					value: 'Cancel'
				},
				icon: {
					type: String,
					value: ''
				},
				big: {
					type: Boolean,
					value: false
				},
				table: {
					type: Boolean,
					value: false
				},
				figure: {
					type: String,
					value: null
				},
				effect: {
					type: String,
					value: null
				}
			};
		}
	}, {
		key: '_computeIconClass',
		value: function _computeIconClass(icon) {
			return icon;
		}
	}, {
		key: '_computeCardClass',
		value: function _computeCardClass(big) {
			var classes = ['card-title'];
			big ? classes.push('big-icon') : null;
			return classes.join(' ');
		}
	}, {
		key: '_computeEffectClass',
		value: function _computeEffectClass(effect) {
			return ['card', effect].join(' ');
		}
	}]);

	return CardClab;
})();

Polymer(CardClab);