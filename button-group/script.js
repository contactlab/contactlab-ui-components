'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroupClab = function () {
	function GroupClab() {
		_classCallCheck(this, GroupClab);
	}

	_createClass(GroupClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'group-clab';
			this.properties = {
				/**
    * Additional class
    */
				type: {
					type: String,
					value: ""
				},
				/**
    * `size` additional class for the size of the buttons
    */
				size: {
					type: String
				},
				/**
    * Whether the buttons are disabled
    */
				disabled: {
					type: Boolean,
					value: false,
					observer: '_updateDisabled'
				},
				/**
    * Index of the button active at init
    */
				value: {
					type: Number,
					value: 0,
					observer: '_updateAppearance',
					reflectToAttribute: true
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			var btns = this.getContentChildren();
			Array.prototype.map.call(btns, function (btn, i) {
				btn.classList.add('group-item');
				btn.appearance = i == _this.value ? '' : 'empty';
				btn.setAttribute('data-i', i);
				btn.addEventListener('btnclick', _this._selectElement.bind(_this));
			});
		}

		/*----------
  OBSERVER
  ----------*/

	}, {
		key: '_updateDisabled',
		value: function _updateDisabled(val, old) {
			var btns = this.getContentChildren();
			Array.prototype.map.call(btns, function (btn) {
				btn.disabled = val;
			});
		}
	}, {
		key: '_updateAppearance',
		value: function _updateAppearance(val, old) {
			var _this2 = this;

			if (old !== undefined && old !== val) {
				this.fire('change', { value: val });

				var btns = this.getContentChildren();
				Array.prototype.map.call(btns, function (btn, i) {
					btn.appearance = i == _this2.value ? '' : 'empty';
				});
			}
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_selectElement',
		value: function _selectElement(evt) {
			this.set('value', Number(evt.target.getAttribute('data-i')));
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: '_computeGroupClass',
		value: function _computeGroupClass(type, size) {
			var arr = ['buttons-group'];
			type ? arr.push(type) : null;
			size ? arr.push(size) : null;
			return arr.join(' ');
		}
	}]);

	return GroupClab;
}();

Polymer(GroupClab);