'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteClab = function () {
	function NoteClab() {
		_classCallCheck(this, NoteClab);
	}

	_createClass(NoteClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "note-clab";
			this.properties = {
				type: String,
				classes: {
					type: String,
					computed: 'computeClasses(type)',
					readonly: true
				}
			};
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: 'computeClasses',
		value: function computeClasses(type) {
			var arr = ['input-note'];
			if (type != undefined) arr.push(type);
			return arr.join(' ');
		}
	}]);

	return NoteClab;
}();

Polymer(NoteClab);