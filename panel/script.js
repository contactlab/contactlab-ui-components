'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PanelClab = (function () {
	function PanelClab() {
		_classCallCheck(this, PanelClab);
	}

	_createClass(PanelClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'panel-clab';
			this.properties = {
				title: {
					type: String,
					value: 'Title'
				},
				type: {
					type: String,
					value: ''
				}
			};
		}
	}, {
		key: '_computeType',
		value: function _computeType(type) {
			return ['panel', type].join(' ');
		}
	}]);

	return PanelClab;
})();

Polymer(PanelClab);