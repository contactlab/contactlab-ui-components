'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccordionClab = function () {
	function AccordionClab() {
		_classCallCheck(this, AccordionClab);
	}

	_createClass(AccordionClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "accordion-clab";
			this.properties = {
				title: {
					type: String,
					value: 'Title'
				},
				type: {
					type: String,
					value: ''
				},
				open: {
					type: Boolean,
					value: false,
					observer: '_animateOpenClose'
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			this.block = this.querySelector('.accordion-block');
			this.content = this.querySelector('.accordion-content');

			// Preparing the animations
			var height = [{ height: '0' }, { height: 'auto' }];
			var margin = [{ 'margin-bottom': '0' }, { 'margin-bottom': '20px' }];

			this.openAccordion = new GroupEffect([new KeyframeEffect(this.content, height, {
				duration: 100,
				fill: 'forwards',
				direction: 'normal'
			}),
			// new KeyframeEffect(this.block, bgColor, {
			// 	duration:100,
			// 	fill:'forwards',
			// 	direction: 'normal'
			// }),
			new KeyframeEffect(this.block, margin, {
				duration: 100,
				fill: 'forwards',
				direction: 'normal'
			})]);

			// new KeyframeEffect(this.block, padding, {
			// 	duration:100,
			// 	fill:'forwards',
			// 	direction: 'normal'
			// }),
			// new KeyframeEffect(this.block, shadow, {
			// 	duration:100,
			// 	fill:'forwards',
			// 	direction: 'normal'
			// })
			this.closeAccordion = new GroupEffect([new KeyframeEffect(this.content, height, {
				duration: 100,
				fill: 'forwards',
				direction: 'reverse'
			}),
			// new KeyframeEffect(this.block, bgColor, {
			// 	duration:100,
			// 	fill:'forwards',
			// 	direction: 'reverse'
			// }),
			new KeyframeEffect(this.block, margin, {
				duration: 100,
				fill: 'forwards',
				direction: 'reverse'
			})]);
		}

		/*----------
  	OBSERVERS
  ----------*/

	}, {
		key: '_animateOpenClose',

		// new KeyframeEffect(this.block, padding, {
		// 	duration:100,
		// 	fill:'forwards',
		// 	direction: 'reverse'
		// }),
		// new KeyframeEffect(this.block, shadow, {
		// 	duration:100,
		// 	fill:'forwards',
		// 	direction: 'reverse'
		// })
		value: function _animateOpenClose(val, old) {
			var _this = this;

			if (old != undefined) {
				if (val) {
					var player = document.timeline.play(this.openAccordion);
					this.querySelector('.accordion-block').classList.add('active');
					setTimeout(function () {
						_this.querySelector('.accordion-content').classList.add('opened');
					}, 110);
				} else {
					var _player = document.timeline.play(this.closeAccordion);
					this.querySelector('.accordion-block').classList.remove('active');
					this.querySelector('.accordion-content').classList.remove('opened');
				}
			}
		}

		/*----------
  	COMPUTED
  ----------*/

	}, {
		key: '_computeType',
		value: function _computeType(type) {
			return ['accordion-block', type].join(' ');
		}
	}, {
		key: '_toggleActive',
		value: function _toggleActive() {
			this.open = !this.open;
		}
	}]);

	return AccordionClab;
}();

Polymer(AccordionClab);