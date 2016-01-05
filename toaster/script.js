'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToasterClab = (function () {
	function ToasterClab() {
		_classCallCheck(this, ToasterClab);
	}

	_createClass(ToasterClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "toaster-clab";
			this.properties = {
				right: {
					type: Boolean,
					value: false
				},
				message: {
					type: String
				},
				callerType: {
					type: String,
					value: 'primary'
				},
				actionType: {
					type: String,
					value: 'success'
				},
				actionText: {
					type: String,
					value: 'OK'
				},

				id: {
					type: Object,
					computed: 'computeIds(right)'
				},
				compCallerType: {
					type: String,
					computed: "computeType('btn', callerType)"
				},
				compActionType: {
					type: String,
					computed: "computeType('btn small flat', actionType)"
				}
			};
		}

		/*---------- 
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_toggleToast',
		value: function _toggleToast(evt) {
			if (evt.target.id) {
				this.$$('#toast-' + this.name).classList.add('visible');
			} else {
				this.$$('#toast-' + this.name).classList.remove('visible');
			}
		}

		/*---------- 
  COMPUTED
  ----------*/

	}, {
		key: 'computeIds',
		value: function computeIds(isRight) {
			this.name = 'right';
			if (!isRight) this.name = 'left';
			return {
				btn: "toast-" + this.name + "-btn",
				toast: "toast-" + this.name
			};
		}
	}, {
		key: 'computeType',
		value: function computeType(def, type) {
			return [def, type].join(' ');
		}
	}, {
		key: '_computeWrapperType',
		value: function _computeWrapperType(isRight) {
			var type = 'toast-wrapper';
			if (isRight) type += ' right';
			return type;
		}
	}]);

	return ToasterClab;
})();

Polymer(ToasterClab);