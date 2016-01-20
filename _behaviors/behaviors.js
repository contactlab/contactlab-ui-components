'use strict';

var UtilBehavior = {

	_dashify: function _dashify(str) {
		return str.replace(/ /g, '-');
	},

	_viewLabel: function _viewLabel(label) {
		if (label != undefined && label.length > 0) return true;else return false;
	},

	_getIndex: function _getIndex(item, items) {
		for (var i = 0; i < items.length; i++) {
			if (JSON.stringify(items[i]) == JSON.stringify(item)) {
				return i;
			}
		}
		return -1;
	}
};