'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertClab = function () {
	function AlertClab() {
		_classCallCheck(this, AlertClab);
	}

	_createClass(AlertClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'alert-clab';
			this.properties = {
				title: {
					type: String,
					value: 'Title'
				},
				type: {
					type: String,
					value: 'success'
				},
				visible: {
					type: Boolean,
					value: false,
					notify: true,
					observer: '_animateShowHide'
				},
				primary: {
					type: String,
					value: 'Confirm'
				},
				secondary: {
					type: String,
					value: 'Cancel'
				},
				notify: {
					type: Boolean,
					value: false
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
			var _this = this;

			// Preparing the animations
			if (!this.noAnimation) {
				(function () {
					var opacity = [{ opacity: 0 }, { opacity: 1 }];
					var translateY = [{ transform: 'translateY(-5px)' }, { transform: 'translateY(0)' }];

					_this.alertEnter = function (target) {
						return new GroupEffect([new KeyframeEffect(target, opacity, {
							duration: 190,
							fill: 'forwards',
							direction: 'normal'
						}), new KeyframeEffect(target, translateY, {
							duration: 190,
							fill: 'forwards',
							direction: 'normal'
						})]);
					};
					_this.alertExit = function (target) {
						return new GroupEffect([new KeyframeEffect(target, opacity, {
							duration: 150,
							fill: 'forwards',
							direction: 'reverse'
						}), new KeyframeEffect(target, translateY, {
							duration: 150,
							fill: 'forwards',
							direction: 'reverse'
						})]);
					};
				})();
			}
		}

		/*----------
  	EVENT HANDLERS
  ----------*/

	}, {
		key: '_handleClick',
		value: function _handleClick(evt) {
			var primary = evt.target.childNodes[1].parentNode.getAttribute('data-primary');
			if (primary == 'true') {
				this.fire('primary');
			} else if (primary == 'false') {
				this.fire('secondary');
			}
		}
	}, {
		key: '_close',
		value: function _close(evt) {
			this.visible = false;
			this.fire('close');
		}

		/*----------
  	OBSERVERS
  ----------*/

	}, {
		key: '_animateShowHide',
		value: function _animateShowHide(val, oldval) {
			var target = this.$$('.alert');

			if (val) {
				if (target == null) {
					this.set('_alertStyle', 'display:block; opacity:1');
					return;
				}

				target.style.display = 'block';
				if (!this.noAnimation && oldval != undefined) {
					var animation = this.alertEnter(target);
					var player = document.timeline.play(animation);
				} else {
					target.style.opacity = 1;
				}
			} else {
				if (!this.noAnimation && target != null) {
					var _animation = this.alertExit(target);
					var _player = document.timeline.play(_animation);
					this._onAnimationComplete(_player, function () {
						target.style.display = 'none';
					});
				} else if (target != null) {
					target.style.display = 'none';
					target.style.opacity = 0;
				}
			}
		}

		/*----------
  	COMPUTED
  ----------*/

	}, {
		key: '_computeType',
		value: function _computeType(str, type) {
			return [str, type].join(' ');
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [AnimationsBehavior];
		}
	}]);

	return AlertClab;
}();

Polymer(AlertClab);