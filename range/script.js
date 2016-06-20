'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RangeClab = function () {
	function RangeClab() {
		_classCallCheck(this, RangeClab);
	}

	_createClass(RangeClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "range-clab";
			this.properties = {
				label: String,
				name: {
					type: String,
					value: 'rangeinput'
				},
				type: {
					type: String,
					value: null
				},
				value: {
					type: Number,
					notify: true,
					reflectToAttribute: true
				},
				min: Number,
				max: Number,
				step: Number,
				disabled: {
					type: Boolean,
					value: false,
					observer: 'disabledChanged'
				},
				showDetails: {
					type: Boolean,
					value: false
				},

				rangeWrapperClasses: {
					type: String,
					computed: 'computeRangeWrapperClasses(showDetails)'
				}
			};
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_updateCompValue',
		value: function _updateCompValue(evt) {
			this.value = this.querySelector('input').value;
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: 'disabledChanged',
		value: function disabledChanged(newVal, oldVal) {
			if (newVal) this.type = 'disabled';
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: 'computeRangeWrapperClasses',
		value: function computeRangeWrapperClasses(show) {
			var name = void 0;
			if (show) name = 'details';
			return ['range-wrapper', name].join(' ');
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return RangeClab;
}();

Polymer(RangeClab);