'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AlertClab = (function () {
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
					observer: '_animateShowHide'
				},
				labels: {
					type: Object,
					value: {
						primary: 'Confirm',
						secondary: 'Cancel'
					}
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
			if (this.visible) this.querySelector('.alert').style.display = 'block';

			// Preparing the animations
			var target = this.querySelector('.alert');
			var opacity = [{ opacity: 0 }, { opacity: 1 }];
			var translateY = [{ transform: 'translateY(-5px)' }, { transform: 'translateY(0)' }];

			this.alertEnter = new GroupEffect([new KeyframeEffect(target, opacity, {
				duration: 190,
				fill: 'forwards',
				direction: 'normal'
			}), new KeyframeEffect(target, translateY, {
				duration: 190,
				fill: 'forwards',
				direction: 'normal'
			})]);
			this.alertExit = new GroupEffect([new KeyframeEffect(target, opacity, {
				duration: 150,
				fill: 'forwards',
				direction: 'reverse'
			}), new KeyframeEffect(target, translateY, {
				duration: 150,
				fill: 'forwards',
				direction: 'reverse'
			})]);
		}

		/*----------
  	EVENT HANDLERS	
  ----------*/

	}, {
		key: '_handleClick',
		value: function _handleClick(evt) {
			if (evt.target.classList.contains('flat')) {
				this.fire('primary');
			} else {
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
		value: function _animateShowHide(val) {
			if (this.querySelector('.alert') == undefined) return;
			var target = this.querySelector('.alert');

			if (val) {
				target.style.display = 'block';
				if (!this.noAnimation) {
					var player = document.timeline.play(this.alertEnter);
				}
			} else {
				if (!this.noAnimation) {
					var player = document.timeline.play(this.alertExit);
					this._onAnimationComplete(player, function () {
						target.style.display = 'none';
					});
				} else {
					target.style.display = 'none';
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
})();

Polymer(AlertClab);