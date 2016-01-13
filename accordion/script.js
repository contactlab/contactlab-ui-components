'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccordionClab = (function () {
	function AccordionClab() {
		_classCallCheck(this, AccordionClab);
	}

	_createClass(AccordionClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "accordion-clab";
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
			return ['accordion-block', type].join(' ');
		}
	}, {
		key: '_toggleActive',
		value: function _toggleActive() {
			this.querySelector('.accordion-block').classList.toggle('active');
		}
	}]);

	return AccordionClab;
})();

Polymer(AccordionClab);