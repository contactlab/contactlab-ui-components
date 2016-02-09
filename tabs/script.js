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
					value: []
				},
				pills: {
					type: Boolean,
					value: false
				},
				active: {
					type: Number,
					value: 0,
					observer: '_changeTab'
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this.tabContents = this.querySelectorAll('.tab-content');
			Array.prototype.map.call(this.tabContents, function (content, i) {
				if (i != _this.active) content.style.display = 'none';
			});
		}

		/*---------- 
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_activateThis',
		value: function _activateThis(evt) {
			evt ? evt.preventDefault() : null;
			this.active = parseInt(evt.currentTarget.parentNode.getAttribute('data-index'));
			this.fire('changed', { 'active': this.active });
		}

		/*---------- 
  OBSERVERS
  ----------*/

	}, {
		key: '_changeTab',
		value: function _changeTab(newVal, oldVal) {
			if (this.tabContents != undefined) {
				Array.prototype.map.call(this.tabContents, function (el, i) {
					if (i === newVal) el.style.display = 'block';else el.style.display = 'none';
				});
			}
		}

		/*---------- 
  COMPUTED
  ----------*/

	}, {
		key: '_computedLabels',
		value: function _computedLabels(tabContents, labels) {
			var newLabels = labels;

			if (tabContents.length >= labels.length) {
				for (var i = 0; i < tabContents.length; i++) {
					if (newLabels[i] === undefined) {
						newLabels.push('Tab ' + (i + 1));
					}
				}
			} else {
				console.error("Some of the labels need a content");
			}

			return newLabels;
		}
	}, {
		key: '_computeType',
		value: function _computeType(pills) {
			var arr = [];
			pills ? arr.push('pills') : arr.push('tabs');
			return arr.join(' ');
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