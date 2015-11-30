"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CalendarClab = (function () {
	function CalendarClab() {
		_classCallCheck(this, CalendarClab);
	}

	_createClass(CalendarClab, [{
		key: "beforeRegister",
		value: function beforeRegister() {
			this.is = "calendar-clab";
			this.properties = {
				label: {
					type: String
				},
				disable: {
					type: Boolean,
					value: false
				},
				inline: {
					type: Boolean,
					value: false
				},
				options: {
					type: Object
				},
				placeholder: {
					type: String
				},
				type: {
					type: String,
					value: ""
				}
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
	}, {
		key: "_checkClear",
		value: function _checkClear(evt) {
			this.querySelector('input').value == "" ? this.clear() : null;
		}
	}, {
		key: "_focusElement",
		value: function _focusElement(evt) {
			var _this2 = this;

			setTimeout(function () {
				_this2.getRomeInstance().show();
			}, 50);
		}
	}, {
		key: "_createInstance",
		value: function _createInstance(selector) {
			var obj = undefined;
			_typeof(this.options) == 'object' ? obj = this.options : obj = this.getRomeInstance().options();
			rome(this.querySelector(selector), obj).on('data', this._changeDate.bind(this));
		}
	}, {
		key: "_getFormat",
		value: function _getFormat() {
			var thisFormat = undefined;
			this.options.inputFormat ? thisFormat = this.options.inputFormat : thisFormat = this.getRomeInstance().options().inputFormat;
			return thisFormat;
		}
	}, {
		key: "_changeDate",
		value: function _changeDate(evt) {
			this.fire('datechange', { date: evt, dateISO: moment(evt).format() });
		}
	}, {
		key: "_computeType",
		value: function _computeType(type) {
			var arr = ['input-wrapper', 'calendar'];
			arr.push(type);
			return arr.join(' ');
		}
	}, {
		key: "_dashify",
		value: function _dashify(label) {
			var str = label.replace(' ', '-');
			return str.toLowerCase();
		}
	}, {
		key: "_viewLabel",
		value: function _viewLabel(label) {
			if (label.length > 0) return true;else return false;
		}
	}, {
		key: "setValue",
		value: function setValue(userValue) {
			this.querySelector('input').value = moment(userValue).format(this._getFormat());
		}
	}, {
		key: "getValue",
		value: function getValue() {
			var elem = this.querySelector('input').value;
			var formatted = moment(elem, this._getFormat()).format();
			return formatted;
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
			this.querySelector('input').value = '';
			var rome = this.getRomeInstance();
			rome.setValue(moment().format());
		}
	}]);

	return CalendarClab;
})();

Polymer(CalendarClab);