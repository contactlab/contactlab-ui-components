'use strict';

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