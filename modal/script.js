'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalClab = (function () {
	function ModalClab() {
		_classCallCheck(this, ModalClab);
	}

	_createClass(ModalClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'modal-clab';
			this.properties = {
				title: {
					type: String,
					value: 'Modal title'
				},
				visible: {
					type: Boolean,
					value: false,
					observer: '_openModal'
				},
				primary: {
					type: String
				},
				secondary: {
					type: String
				},
				content: {
					type: String
				}
			};
		}
	}, {
		key: '_openModal',
		value: function _openModal(newVal, oldVal) {
			var _this = this;

			if (newVal) {
				this.async(function () {
					if (_this.querySelector('.modal-body').innerHTML == '') _this.querySelector('.modal-body').innerHTML = _this.content;
				}, 50);
			}
		}
	}, {
		key: '_closeModal',
		value: function _closeModal(evt) {
			evt.stopPropagation();
			this.visible = false;
		}
	}, {
		key: '_block',
		value: function _block(evt) {
			evt.stopPropagation();
		}
	}, {
		key: '_primary',
		value: function _primary(evt) {
			this.fire('modal-primary');
		}
	}, {
		key: '_secondary',
		value: function _secondary(evt) {
			this.fire('modal-secondary');
		}
	}]);

	return ModalClab;
})();

Polymer(ModalClab);