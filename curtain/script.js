'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurtainClab = function () {
	function CurtainClab() {
		_classCallCheck(this, CurtainClab);
	}

	_createClass(CurtainClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "curtain-clab";
			this.properties = {
				id: String,
				options: Array,
				highlighted: Object,
				labelField: String,
				valueField: String,
				dontHide: {
					type: Boolean,
					notify: true
				},
				maxInView: Number,
				disabled: {
					type: Boolean,
					value: false
				},
				open: {
					type: Boolean,
					value: false
				},

				//_liHeight:Number,
				maxHeight: {
					type: Number,
					value: 28
				},
				_listMaxHeight: String,
				_listHeight: String,
				_hidden: {
					type: Boolean,
					value: false
				},
				_computedStyles: String
			};
			this.observers = ['_setLiHeight(options, maxInView, disabled)', '_compStyles(_hidden, _listMaxHeight, _listHeight, open)'];
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this.addEventListener('mousedown', function (evt) {
				switch (evt.target.localName) {
					case 'ol':
						_this.dontHide = true;
						break;
					case 'li':
						_this.dontHide = false;
						var i = evt.target.getAttribute('data-i');
						_this.fire('do-select', { index: i });
						break;
					default:
						_this.dontHide = false;
				}
			});
			this.addEventListener('mouseup', function (evt) {
				_this.dontHide = false;
			});
		}

		/*----------
  	EVENT HANDLERS
  ----------*/

	}, {
		key: 'doHighlight',
		value: function doHighlight(evt) {
			var i = evt.target.getAttribute('data-i');
			this.fire('do-highlight', { index: i });
		}

		/*----------
  	METHODS
  ----------*/

	}, {
		key: '_setLiHeight',
		value: function _setLiHeight(options, maxInView, disabled) {
			var _this2 = this;

			if (options != undefined && options.length > 0 && maxInView != undefined && !disabled) {
				this.async(function () {
					if (_this2.maxHeight == undefined || _this2.maxHeight == '') {
						_this2.set('_hidden', true);
						_this2.maxHeight = 28;
						_this2.set('_listMaxHeight', _this2.maxHeight * maxInView + 'px');
						_this2.set('_hidden', false);
					} else {
						_this2.set('_hidden', true);
						_this2.set('_listMaxHeight', _this2.maxHeight * maxInView + 'px');
						_this2.set('_hidden', false);
					}

					_this2.set('_listHeight', _this2.maxHeight * options.length + 'px');
					_this2.$.list.scrollTop = 0;
				}, 100);
			}
		}

		/*----------
  	COMPUTERS
  ----------*/

	}, {
		key: '_compHighlight',
		value: function _compHighlight(highlighted, option) {
			return highlighted[this.valueField] === option[this.valueField] ? 'selected' : '';
		}
	}, {
		key: '_compLabel',
		value: function _compLabel(opt) {
			return opt[this.labelField];
		}
	}, {
		key: '_compStyles',
		value: function _compStyles(hidden, maxHeight, height, open) {
			var arr = [];
			if (hidden) arr.push('display:block; opacity:0');
			if (maxHeight != undefined) arr.push('max-height:' + maxHeight);
			if (height != undefined) arr.push('height:' + height);
			if (open) arr.push('display:block');
			this.set('_computedStyles', arr.join(';'));
		}

		/*----------
  	PUBLIC
  ----------*/

	}, {
		key: 'scrollToHighlight',
		value: function scrollToHighlight(i, goesUp) {
			var offsetTop = this.$.list.children[i].offsetTop,
			    scrollTop = this.$.list.scrollTop,
			    h = this.$.list.clientHeight,
			    visible = offsetTop < scrollTop || offsetTop >= scrollTop + h ? false : true;

			if (!visible && !goesUp) this.$.list.scrollTop += this.$.list.clientHeight;else if (!visible && goesUp) this.$.list.scrollTop -= this.$.list.clientHeight;
		}
	}]);

	return CurtainClab;
}();

Polymer(CurtainClab);