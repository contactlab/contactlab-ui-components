'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiSelClab = (function () {
	function MultiSelClab() {
		_classCallCheck(this, MultiSelClab);
	}

	_createClass(MultiSelClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "multi-sel-clab";
			this.properties = {
				name: {
					type: String,
					value: 'multiple select'
				},
				options: {
					type: Array,
					value: [{ value: 'A', label: 'Option 1' }, { value: 'B', label: 'Option 2' }, { value: 'C', label: 'Option 3' }, { value: 'D', label: 'Option 4' }, { value: 'E', label: 'Option 5' }]
				},
				type: {
					type: String,
					value: 'primary'
				},
				label: {
					type: String,
					value: null
				},
				disabled: {
					type: Boolean,
					value: false,
					observer: 'disabledChanged'
				}
				/*optionsFn: {
    	type: Function,
    	observer: '_setOptions'
    }*/
			};
		}

		/*---------- 
  UTILITIES	
  ----------*/

	}, {
		key: '_dashify',
		value: function _dashify(str) {
			return str.replace(/ /g, '-');
		}

		/*---------- 
  OBSERVERS
  ----------*/

	}, {
		key: 'disabledChanged',
		value: function disabledChanged(newVal, oldVal) {
			if (newVal) this.type = 'disabled';
		}
	}]);

	return MultiSelClab;
})();

Polymer(MultiSelClab);