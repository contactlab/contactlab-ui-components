'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TabsClab = (function () {
	function TabsClab() {
		_classCallCheck(this, TabsClab);
	}

	_createClass(TabsClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'tabs-clab';
			this.properties = {
				labels: {
					type: Array,
					value: ['Tab 1', 'Tab 2']
				},
				pills: {
					type: Boolean,
					value: false
				},
				active: {
					type: Number,
					value: 0
				},
				tabs: {
					type: Array,
					value: [],
					readonly: true
				},
				tabContent: {
					type: Array
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			this.tabContent = this.querySelectorAll('.tab-content');
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Array.from(this.tabContent)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var content = _step.value;

					content.style.display = 'none';
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.tabContent[this.active].style.display = 'block';
		}
	}, {
		key: '_computeType',
		value: function _computeType(pills) {
			var arr = [];
			pills ? arr.push('pills') : arr.push('tabs');
			return arr.join(' ');
		}
	}, {
		key: '_changeTab',
		value: function _changeTab(evt, index) {
			evt ? evt.preventDefault() : null;
			this.active = parseInt(evt.currentTarget.parentNode.getAttribute('data-index'));

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = Array.from(this.tabContent)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var content = _step2.value;

					content.style.display = 'none';
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.tabContent[this.active].style.display = 'block';
		}
	}, {
		key: '_computeActive',
		value: function _computeActive(active, index) {
			var arr = ['tab'];
			active === index ? arr.push('active') : arr;
			return arr.join(' ');
		}
	}]);

	return TabsClab;
})();

Polymer(TabsClab);