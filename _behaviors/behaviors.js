'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var UtilBehavior = {

	_dashify: function _dashify(str) {
		return str.toLowerCase().replace(/ /g, '-');
	},

	_viewLabel: function _viewLabel(label, icon) {
		var bool = false;
		if (label != undefined && label.length > 0) bool = true;else bool = false;
		if (icon != undefined && icon.length > 0) bool = true;
		return bool;
	},

	_getIndex: function _getIndex(item, items) {
		return items.indexOf(item);
	}
};

var AnimationsBehavior = {

	_onAnimationComplete: function _onAnimationComplete(elem, fn) {
		if (elem.finished) {
			elem.finished.then(fn);
		} else {
			elem.onfinish = fn;
		}
	}
};

var DropdownBehavior = {
	getSelectedLabel: function getSelectedLabel() {
		return this.selected[this.labelField];
	},

	getSelectedValue: function getSelectedValue() {
		return this.selected[this.valueField];
	},

	setByLabel: function setByLabel(str) {
		var _this = this;

		this.options.map(function (opt) {
			if (opt[_this.labelField] === str) {
				_this._setSelected(opt);
				return;
			}
		});
	},

	setByValue: function setByValue(str) {
		var _this2 = this;

		this.options.map(function (opt) {
			if (opt[_this2.valueField] === str) {
				_this2._setSelected(opt);
				return;
			}
		});
	},

	isValorized: function isValorized() {
		return !this.isNotValorized();
	},

	isNotValorized: function isNotValorized() {
		return this.selected === undefined || this.selected === null || this.selected[this.valueField] === undefined || this.selected[this.valueField] === null;
	},

	setValue: function setValue(obj, prevent) {
		var _this3 = this;

		console.log('RULE-HEADER.setValue(' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) + '): ', obj);
		prevent = prevent ? true : false;
		this.preventChange = prevent;

		if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
			this._setSelected(obj);
			console.log('RULE-HEADER.setValue(obj): ', obj);
		} else {
			this.options.map(function (opt) {
				if (opt[_this3.valueField] === obj) {
					_this3._setSelected(opt);
					return;
				}
			});
		}

		this.preventChange = false;
	},

	getValue: function getValue() {
		var v;
		if (this.isNotValorized()) {
			v = undefined;
		} else if (typeof this.selected === 'string' || this.selected instanceof String) {
			v = this.selected;
		} else if (_typeof(this.selected) === "object") {
			v = this.selected[this.valueField];
		} else {
			console.error(this.is + ": Invalid value type [" + _typeof(this.selected) + "]");
		}
		return v;
	},

	getValueObject: function getValueObject() {
		var _this4 = this;

		var v;
		if (this.isNotValorized(this.selected)) {
			v = undefined;
		} else if (typeof this.selected === 'string' || this.selected instanceof String) {
			this.options.map(function (opt) {
				if (opt[_this4.valueField] === _this4.selected) {
					v = opt;
					return;
				}
			});
			if (v === undefined) {
				console.warn(this.is + ": There is no option with value equal to [" + this.selected + "]");
			}
		} else if (_typeof(this.selected) === "object") {
			v = this.selected;
		} else {
			console.warn(this.is + ": Invalid value type [" + _typeof(this.selected) + "]");
		}
		return v;
	}
};