'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertClab = (function () {
	function AlertClab() {
		_classCallCheck(this, AlertClab);
	}

	_createClass(AlertClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "alert-clab";
			this.properties = {
				title: {
					type: String,
					value: 'Title'
				},
				type: {
					type: String,
					value: 'success'
				},
				visible: {
					type: Boolean,
					value: false
				},
				labels: {
					type: Object,
					value: {
						primary: 'Confirm',
						secondary: 'Cancel'
					}
				}
			};
		}
	}, {
		key: '_computeType',
		value: function _computeType(type) {
			return ['alert', type].join(' ');
		}
	}, {
		key: '_close',
		value: function _close() {
			this.visible = false;
		}
	}, {
		key: '_handleClick',
		value: function _handleClick(evt) {
			if (!evt.target.classList.contains('flat')) {
				this.fire('primary');
			} else {
				this.fire('secondary');
			}
		}
	}]);

	return AlertClab;
})();

Polymer(AlertClab);