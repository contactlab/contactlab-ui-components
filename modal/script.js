'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalClab = function () {
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
					observer: '_animateShowHide'
				},
				primary: {
					type: String,
					value: null
				},
				secondary: {
					type: String,
					value: null
				},
				warning: {
					type: String,
					value: null
				},
				primaryDisabled: {
					type: Boolean,
					value: false
				},
				content: {
					type: String,
					value: null
				},
				stopClose: {
					type: Boolean,
					value: false
				},
				width: {
					type: Number,
					value: 840
				},
				noAnimation: {
					type: Boolean,
					value: false
				},
				noActions: {
					type: Boolean,
					value: false
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			// Preparing the animations
			if (!this.noAnimation) {
				(function () {
					var opacity = [{ opacity: 0 }, { opacity: 1 }];
					var scale = [{ transform: 'scale(.95)' }, { transform: 'scale(1)' }];

					_this.modalEnter = function (target) {
						return new GroupEffect([new KeyframeEffect(target, opacity, {
							duration: 190,
							fill: 'forwards',
							direction: 'normal'
						}), new KeyframeEffect(_this.querySelector('.modal'), scale, {
							duration: 190,
							fill: 'forwards',
							direction: 'normal'
						})]);
					};
					_this.modalExit = function (target) {
						return new GroupEffect([new KeyframeEffect(target, opacity, {
							duration: 150,
							fill: 'forwards',
							direction: 'reverse'
						}), new KeyframeEffect(_this.querySelector('.modal'), scale, {
							duration: 150,
							fill: 'forwards',
							direction: 'reverse'
						})]);
					};
				})();
			}
		}
	}, {
		key: '_computeWidth',
		value: function _computeWidth(width) {
			var str = 'max-width:' + width + 'px';
			return str;
		}

		/*----------
  	EVENT HANDLERS
  ----------*/

	}, {
		key: '_closeModal',
		value: function _closeModal(evt) {
			evt.stopPropagation();
			if (!this.stopClose) this.visible = false;
			this.fire('close');
		}
	}, {
		key: '_block',
		value: function _block(evt) {
			evt.stopPropagation();
		}
	}, {
		key: '_primaryAction',
		value: function _primaryAction(evt) {
			this.fire('modal-primary');
		}
	}, {
		key: '_secondaryAction',
		value: function _secondaryAction(evt) {
			this.fire('modal-secondary');
		}
	}, {
		key: '_warningAction',
		value: function _warningAction(evt) {
			this.fire('modal-warning');
		}

		/*----------
  	OBSERVERS
  ----------*/

	}, {
		key: '_animateShowHide',
		value: function _animateShowHide(val, oldval) {
			var target = this.querySelector('.modal-overlay');

			if (oldval != undefined) {
				if (val) {
					document.querySelector('body').classList.add('no-scroll');
					target.style.display = 'block';
					if (!this.noAnimation) {
						var animation = this.modalEnter(target);
						var player = document.timeline.play(animation);
					} else {
						target.style.opacity = 1;
					}
				} else {
					document.querySelector('body').classList.remove('no-scroll');
					if (!this.noAnimation) {
						var _animation = this.modalExit(target);
						var _player = document.timeline.play(_animation);
						this._onAnimationComplete(_player, function () {
							target.style.display = 'none';
						});
					} else {
						target.style.display = 'none';
						target.style.opacity = 0;
					}
				}
			}
		}

		/*----------
  	PUBLIC
  ----------*/

	}, {
		key: 'show',
		value: function show() {
			this.visible = true;
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.visible = false;
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [AnimationsBehavior];
		}
	}]);

	return ModalClab;
}();

Polymer(ModalClab);