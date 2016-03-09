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
         * Whether the buttons are small
         */
				small: {
					type: Boolean,
					value: false
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
         * Additional class
         */
				type: {
					type: String,
					value: ""
				},
				/**
         * Index of the button active at init
         */
				value: {
					type: Number,
					value: 0,
					observer: '_initialize',
					reflectToAttribute: true
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var btns = this.getContentChildren();
			Array.prototype.map.call(btns, function (btn) {
				btn.classList.add('group-item');
			});
			this._initialize();
		}

		/*----------
  OBSERVER
  ----------*/

	}, {
		key: '_updateDisabled',
		value: function _updateDisabled() {
			var _this = this;

			var btns = this.getContentChildren();
			Array.prototype.map.call(btns, function (btn) {
				btn.disabled = _this.disabled;
			});
		}

		/*----------
  METHODS
  ----------*/

	}, {
		key: '_initialize',
		value: function _initialize() {
			var _this2 = this;

			var btns = this.getContentChildren();
			Array.prototype.map.call(btns, function (btn) {
				typeof btn.appearance === 'string' ? btn.appearance = '' : null;
				btn.setAttribute('data-i', btns.indexOf(btn));
				btn.addEventListener('click', _this2._selectElement.bind(_this2));
			});
			typeof btns[this.value].appearance === 'string' ? btns[this.value].appearance = 'full' : null;
			// this.fire('change', {value: this.value});
		}
	}, {
		key: '_selectElement',
		value: function _selectElement(evt) {
			evt.preventDefault();
			var old = this.value;
			var btns = this.getContentChildren();
			Array.prototype.map.call(btns, function (btn) {
				btn.appearance = '';
			});
			this.value = parseInt(evt.target.parentNode.getAttribute('data-i'));
			btns[this.value].appearance = 'full';
			old !== this.value ? this.fire('change', { value: this.value }) : null;
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: '_computeGroupClass',
		value: function _computeGroupClass(type, small) {
			var arr = ['buttons-group', type];
			small ? arr.push('small') : null;
			return arr.join(' ');
		}
	}]);

	return GroupClab;
}();

Polymer(GroupClab);