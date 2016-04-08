'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalClab = (function () {
	function ModalClab() {
		_classCallCheck(this, ModalClab);
	}

	_createClass(ModalClab, [{
		key: 'beforeRegister',

		/*set behaviors(value) {
  	this._behaviors = value;
  }*/

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
					type: String
				},
				primaryDisabled: {
					type: Boolean,
					value: false
				},
				secondary: {
					type: String
				},
				warningBtn: {
					type: String
				},
				content: {
					type: String,
					value: null
				},
				noAnimation: {
					type: Boolean,
					value: false
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			// Preparing the animations
			if (!this.noAnimation) {
				var target = this.querySelector('.modal-overlay');
				var opacity = [{ opacity: 0 }, { opacity: 1 }];
				var scale = [{ transform: 'scale(.95)' }, { transform: 'scale(1)' }];

				this.modalEnter = new GroupEffect([new KeyframeEffect(target, opacity, {
					duration: 190,
					fill: 'forwards',
					direction: 'normal'
				}), new KeyframeEffect(this.querySelector('.modal'), scale, {
					duration: 190,
					fill: 'forwards',
					direction: 'normal'
				})]);
				this.modalExit = new GroupEffect([new KeyframeEffect(target, opacity, {
					duration: 150,
					fill: 'forwards',
					direction: 'reverse'
				}), new KeyframeEffect(this.querySelector('.modal'), scale, {
					duration: 150,
					fill: 'forwards',
					direction: 'reverse'
				})]);
			}
		}

		/*----------
  	EVENT HANDLERS
  ----------*/

	}, {
		key: '_closeModal',
		value: function _closeModal(evt) {
			evt.stopPropagation();
			this.visible = false;
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
		key: '_thirdAction',
		value: function _thirdAction(evt) {
			this.fire('modal-third');
		}

		/*----------
  	OBSERVERS
  ----------*/

	}, {
		key: '_animateShowHide',
		value: function _animateShowHide(val) {
			var target = this.querySelector('.modal-overlay');

			if (val) {
				target.style.display = 'table';
				if (!this.noAnimation) {
					var player = document.timeline.play(this.modalEnter);
				} else {
					target.style.opacity = 1;
				}
			} else {
				if (!this.noAnimation) {
					var player = document.timeline.play(this.modalExit);
					this._onAnimationComplete(player, function () {
						target.style.display = 'none';
					});
				} else {
					target.style.display = 'none';
					target.style.opacity = 0;
				}
			}
		}

		/*----------
  	COMPUTE
  ----------*/

	}, {
		key: '_checkIfTrue',
		value: function _checkIfTrue(str) {
			if (str != undefined && str.length > 0) {
				return true;
			} else {
				return false;
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
})();

Polymer(ModalClab);