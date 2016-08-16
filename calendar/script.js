"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalendarClab = function () {
	function CalendarClab() {
		_classCallCheck(this, CalendarClab);
	}

	_createClass(CalendarClab, [{
		key: "beforeRegister",
		value: function beforeRegister() {
			this.is = "calendar-clab";
			this.properties = {
				label: String,
				disabled: {
					type: Boolean,
					value: false
				},
				valueStr: {
					type: String,
					value: null,
					notify: true
				},
				inline: {
					type: Boolean,
					value: false
				},
				options: {
					type: Object,
					value: {}
				},
				placeholder: String,
				type: String,
				noteType: String
			};
		}
	}, {
		key: "attached",
		value: function attached() {
			var _this = this;

			setTimeout(function () {
				_this.inline ? _this._createInstance('div.inline-cal') : _this._createInstance("input");
			}, 50);
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: "_checkClear",
		value: function _checkClear(evt) {
			if (evt.target.value == "") {
				this.clear();
				this.fire('datechange', { date: undefined, dateISO: undefined });
			}
		}
	}, {
		key: "_focusElement",
		value: function _focusElement(evt) {
			if (!this.disabled) {
				evt.stopPropagation();
				console.log(this.getRomeInstance());
				this.getRomeInstance().show();
			}
		}

		/*----------
  METHODS
  ----------*/

	}, {
		key: "_createInstance",
		value: function _createInstance(selector) {
			var obj = _typeof(this.options) == 'object' ? this.options : this.getRomeInstance().options();
			rome(this.$$(selector), obj).on('data', this._changeDate.bind(this));
		}
	}, {
		key: "_changeDate",
		value: function _changeDate(evt) {
			this.valueStr = evt;
			this.fire('datechange', { date: evt, dateISO: moment(new Date(evt)).format() });
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: "_computeType",
		value: function _computeType(str, type) {
			return [str, type].join(' ');
		}

		/*----------
  UTILS
  ----------*/

	}, {
		key: "_getFormat",
		value: function _getFormat() {
			var thisFormat = this.options.inputFormat ? this.options.inputFormat : this.getRomeInstance().options().inputFormat;
			return thisFormat;
		}

		/*----------
  PUBLIC METHODS
  ----------*/

	}, {
		key: "setValue",
		value: function setValue(userValue) {
			this.valueStr = moment(userValue).format(this._getFormat());
		}
	}, {
		key: "getValue",
		value: function getValue() {
			var formatted = moment(this.valueStr, this._getFormat()).format();
			return this.valueStr ? formatted : undefined;
		}
	}, {
		key: "getRomeInstance",
		value: function getRomeInstance() {
			return rome.find(this.querySelector('input'));
		}
	}, {
		key: "clear",
		value: function clear() {
			this.value = '';
			this.valueStr = null;
			var rome = this.getRomeInstance();
			rome.setValue(moment().format());
		}
	}, {
		key: "behaviors",
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return CalendarClab;
}();

Polymer(CalendarClab);