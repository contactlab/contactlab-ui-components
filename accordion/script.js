'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccordionClab = (function () {
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
			this.height = this.querySelector('.accordion-content').clientHeight;

			// Preparing the animations
			this.block = this.querySelector('.accordion-block');
			this.content = this.querySelector('.accordion-content');
			this.content.style.height = 0;
			this.content.style.opacity = 1;

			var height = [{ height: '0' }, { height: this.height + 'px' }];
			var bgColor = [{ 'background-color': 'rgba(255, 255, 255, 0)' }, { 'background-color': 'rgba(255, 255, 255, 1)' }];
			var margin = [{ 'margin-bottom': '0' }, { 'margin-bottom': '20px' }];
			var padding = [{ 'padding': '0' }, { 'padding': '20px' }];
			var shadow = [{ 'box-shadow': '0 0 0 0 rgba(0, 0, 0, 0)' }, { 'box-shadow': '0 2px 5px 0 rgba(0, 0, 0, 0.16)' }];

			this.openAccordion = new GroupEffect([new KeyframeEffect(this.content, height, {
				duration: 190,
				fill: 'forwards',
				direction: 'normal'
			}), new KeyframeEffect(this.block, bgColor, {
				duration: 100,
				fill: 'forwards',
				direction: 'normal'
			}), new KeyframeEffect(this.block, margin, {
				duration: 100,
				fill: 'forwards',
				direction: 'normal'
			}), new KeyframeEffect(this.block, padding, {
				duration: 100,
				fill: 'forwards',
				direction: 'normal'
			}), new KeyframeEffect(this.block, shadow, {
				duration: 100,
				fill: 'forwards',
				direction: 'normal'
			})]);

			this.closeAccordion = new GroupEffect([new KeyframeEffect(this.content, height, {
				duration: 100,
				fill: 'forwards',
				direction: 'reverse'
			}), new KeyframeEffect(this.block, bgColor, {
				duration: 100,
				fill: 'forwards',
				direction: 'reverse'
			}), new KeyframeEffect(this.block, margin, {
				duration: 100,
				fill: 'forwards',
				direction: 'reverse'
			}), new KeyframeEffect(this.block, padding, {
				duration: 100,
				fill: 'forwards',
				direction: 'reverse'
			}), new KeyframeEffect(this.block, shadow, {
				duration: 100,
				fill: 'forwards',
				direction: 'reverse'
			})]);
		}
	}, {
		key: '_animateOpenClose',
		value: function _animateOpenClose(val, old) {
			if (old != undefined) {
				if (val) {
					var player = document.timeline.play(this.openAccordion);
					this.querySelector('.accordion-title').classList.add('active');
				} else {
					var player = document.timeline.play(this.closeAccordion);
					this.querySelector('.accordion-title').classList.remove('active');
				}
			}
		}
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
})();

Polymer(AccordionClab);