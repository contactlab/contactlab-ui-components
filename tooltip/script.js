"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TooltipClab = function () {
	function TooltipClab() {
		_classCallCheck(this, TooltipClab);
	}

	_createClass(TooltipClab, [{
		key: "beforeRegister",
		value: function beforeRegister() {
			this.is = "tooltip-clab";
			this.properties = {
				type: {
					type: String,
					value: ""
				},
				visible: {
					type: Boolean,
					value: false,
					observer: '_observVisibility'
				},
				wait: {
					type: Number,
					value: 500
				}
			};
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: "_handleMouseOnLabel",
		value: function _handleMouseOnLabel(evt) {
			var _this = this;

			switch (evt.type) {
				case 'mouseenter':
					this._resetTimeout('hideInterval');
					if (!this.visible) {
						this._startTimeout('showInterval', function () {
							_this.show();
						}, this.wait);
					}
					break;
				case 'mouseleave':
					this._resetTimeout('showInterval');
					if (this.visible) {
						this._startTimeout('hideInterval', function () {
							_this.hide();
						}, 100);
					}
					break;
			}
		}
	}, {
		key: "_handleMouseOnTT",
		value: function _handleMouseOnTT(evt) {
			var _this2 = this;

			switch (evt.type) {
				case 'mouseenter':
					this._resetTimeout('hideInterval');
					break;
				case 'mouseleave':
					this._startTimeout('hideInterval', function () {
						_this2.hide();
					}, 100);
					break;
			}
		}

		/*----------
  METHODS
  ----------*/

	}, {
		key: "_startTimeout",
		value: function _startTimeout(type, fn, time) {
			if (this[type] != undefined) this._resetTimeout();
			this[type] = this.async(function () {
				fn();
			}, time);
		}
	}, {
		key: "_resetTimeout",
		value: function _resetTimeout(type) {
			this.cancelAsync(this[type]);
			this[type] = undefined;
		}
	}, {
		key: "_positionHorizontal",
		value: function _positionHorizontal(left, right, arrowLeft) {
			var tooltip = this.querySelector('.tooltip');
			var arrow = this.querySelector('.tooltip .arrow');

			tooltip.style.left = left;
			tooltip.style.right = right;
			arrow.style.left = arrowLeft + 'px';
		}
	}, {
		key: "_positionVertical",
		value: function _positionVertical(tooltipTop, rotation, top, bottom) {
			var tooltip = this.querySelector('.tooltip');
			var arrow = this.querySelector('.tooltip .arrow');

			tooltip.style.top = tooltipTop + 'px';
			arrow.style.webkitTransform = 'rotate(' + rotation + 'deg)';
			arrow.style.msTransform = 'rotate(' + rotation + 'deg)';
			arrow.style.transform = 'rotate(' + rotation + 'deg)';
			arrow.style.top = top;
			arrow.style.bottom = bottom;
		}
	}, {
		key: "_setTooltipPosition",
		value: function _setTooltipPosition() {
			var targetSize = void 0;
			if (Polymer.dom(this.querySelector('.tt-label')).node.$) //if the content is a component or not
				targetSize = Polymer.dom(this.querySelector('.tt-label')).node.children[0].getBoundingClientRect();else targetSize = this.querySelector('.tt-label').getBoundingClientRect();
			var tooltipSize = this.querySelector('.tooltip').getBoundingClientRect();
			var center = targetSize.left + targetSize.width / 2;

			if (tooltipSize.width / 2 > center - 20) // rientra a sinistra
				this._positionHorizontal('20px', 'auto', center - 25);else if (center + tooltipSize.width / 2 > window.innerWidth - 20) // rientra a destra
				this._positionHorizontal('auto', '20px', tooltipSize.width - targetSize.width / 2 - 5);else this._positionHorizontal(center - tooltipSize.width / 2 + 'px', 'auto', tooltipSize.width / 2 - 5);
			if (targetSize.bottom + tooltipSize.height > window.innerHeight) // allinea verticalmente
				this._positionVertical(targetSize.top - tooltipSize.height - 5, '-135', 'auto', '-5px');else this._positionVertical(targetSize.bottom + 5, '45', '-5px', 'auto');
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: "_observVisibility",
		value: function _observVisibility(newv, oldv) {
			var _this3 = this;

			var hideTooltip = function hideTooltip(evt) {
				_this3.hide();
				document.body.removeEventListener('wheel', hideTooltip.bind(_this3));
			};
			if (newv) {
				document.body.addEventListener('wheel', hideTooltip.bind(this));
			}
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: "_computeTooltipClass",
		value: function _computeTooltipClass(type, visible) {
			var arr = ['tooltip'];
			if (type) arr.push(type);
			if (visible) arr.push('visible');
			return arr.join(' ');
		}

		/*----------
  PUBLIC
  ----------*/

	}, {
		key: "show",
		value: function show() {
			this.targetPosition = window.getComputedStyle(this).getPropertyValue('position');
			this.visible = true;
			// Polymer.dom.flush();

			this._setTooltipPosition();
			this.querySelector('.tooltip').style.opacity = '1';
		}
	}, {
		key: "hide",
		value: function hide() {
			this.querySelector('.tooltip').style.opacity = '0';
			this.visible = false;
		}
	}]);

	return TooltipClab;
}();

Polymer(TooltipClab);