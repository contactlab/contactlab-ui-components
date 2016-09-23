'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeatureClab = function () {
	function FeatureClab() {
		_classCallCheck(this, FeatureClab);
	}

	_createClass(FeatureClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "feature-clab";
			this.properties = {
				link: {
					type: String,
					value: null
				},
				linkTarget: {
					type: String,
					value: '_self'
				},
				iconClass: {
					type: String,
					value: null
				},
				src: {
					type: String,
					value: null
				},
				size: {
					type: String,
					value: null
				},
				vertical: {
					type: Boolean,
					value: false
				}
			};
		}

		/*----------
  COMPUTE
  ----------*/

	}, {
		key: '_computeFeatureClass',
		value: function _computeFeatureClass(size, vertical) {
			var arr = ['feature'];
			if (size) arr.push(size);
			if (vertical) arr.push('vertical');
			return arr.join(' ');
		}
	}, {
		key: '_compDisplay',
		value: function _compDisplay(prop) {
			return prop != null && prop != undefined && prop ? '' : 'display:none';
		}
	}]);

	return FeatureClab;
}();

Polymer(FeatureClab);