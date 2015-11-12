"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
				value: {
					type: String,
					reflectToAttribute: true
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
					type: Object,
					value: {}
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
			this.inline ? this._createInstance('div.inline-cal') : this._createInstance("input");
		}
	}, {
		key: "_focusElement",
		value: function _focusElement() {
			this.querySelector('input').focus();
		}
	}, {
		key: "_createInstance",
		value: function _createInstance(selector) {
			rome(this.querySelector(selector), this.options).on('data', this._changeDate.bind(this));
		}
	}, {
		key: "_changeDate",
		value: function _changeDate(evt) {
			this.value = moment(evt).format();
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
		key: "getRomeInstance",
		value: function getRomeInstance() {
			return rome.find(this.querySelector('input'));
		}
	}]);

	return CalendarClab;
})();

Polymer(CalendarClab);