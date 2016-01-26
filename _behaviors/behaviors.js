'use strict';

var UtilBehavior = {

	_dashify: function _dashify(str) {
		return str.toLowerCase().replace(/ /g, '-');
	},

	_viewLabel: function _viewLabel(label) {
		if (label != undefined && label.length > 0) return true;else return false;
	},

	_getIndex: function _getIndex(item, items) {
		items.map(function (el, i) {
			if (JSON.stringify(el) == JSON.stringify(item)) {
				return i;
			}
		});
		return -1;
	}
};