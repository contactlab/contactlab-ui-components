'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TabsClab = function () {
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
				vertical: {
					type: Boolean,
					value: false
				},
				centered: {
					type: Boolean,
					value: false
				},
				fullWidth: {
					type: Boolean,
					value: false
				},
				active: {
					type: Number,
					value: 0
				},
				current: {
					type: String,
					notify: true
				},
				_content: Array
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			this._content = this.getEffectiveChildren();
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_activateThis',
		value: function _activateThis(evt) {
			evt ? evt.preventDefault() : null;
			this.active = parseInt(evt.currentTarget.parentNode.getAttribute('data-index'));
			this.fire('change', { 'active': this.active });
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: '_changeTab',
		value: function _changeTab(active, content) {
			var _this = this;

			if (active != undefined && content != undefined && content.length > 0) {
				this.set('current', this.labels[active]);

				while (Polymer.dom(this.$.activeContentWrapper).firstChild) {
					Polymer.dom(this.$.activeContentWrapper).removeChild(Polymer.dom(this.$.activeContentWrapper).firstChild);
				}
				Array.prototype.map.call(this._content, function (node, i) {
					if (i == active) {
						Polymer.dom(_this.$.activeContentWrapper).appendChild(node);
						Polymer.dom.flush();
						return;
					}
				});
			}
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: '_computeType',
		value: function _computeType(pills, vertical, centered, fullWidth) {
			var arr = [];
			pills ? arr.push('pills') : arr.push('tabs');
			if (vertical) arr.push('vertical');
			if (centered) arr.push('centered');
			if (fullWidth) arr.push('full-width');
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
}();

Polymer(TabsClab);