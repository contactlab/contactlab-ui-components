'use strict';

var UtilBehavior = {

	_dashify: function _dashify(str) {
		return str.replace(/ /g, '-');
	},

	_viewLabel: function _viewLabel(label) {
		if (label.length > 0) return true;else return false;
	},

	_getIndex: function _getIndex(item, items) {
		return items.indexOf(item);
	}
};