'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AutoCompleteClab = (function () {
	function AutoCompleteClab() {
		_classCallCheck(this, AutoCompleteClab);
	}

	_createClass(AutoCompleteClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "auto-complete-clab";
			this.properties = {
				label: {
					type: String,
					value: null
				},
				name: {
					type: String,
					value: 'auto complete'
				},
				value: {
					type: Object
				},
				disabled: {
					type: Boolean,
					value: false
				},
				options: {
					type: Array,
					value: [{ value: 'A', label: 'Option 1' }, { value: 'B', label: 'Option 2' }]
				},
				noHints: {
					type: Boolean,
					value: false
				},
				resultAsObj: {
					type: Boolean,
					value: false
				},
				// Min amount of characters to start searching for hints
				minChar: {
					type: Number,
					value: 3
				},
				// How many LIs are visible without scrolling (=> sets max-height of OL)
				maxInView: {
					type: Number,
					value: 2
				},

				/*---------- 
      PRIVATE
    ----------*/
				inputString: {
					type: String,
					readonly: true
				},
				liHeight: {
					type: String,
					value: null,
					readonly: true
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this.list = this.querySelector('.options-list');
			this.currentHint = undefined;
			this.currentRes = [];

			this.options.forEach(function (opt, i) {
				opt.show = false;
			});
			if (this.value != undefined) {
				this._setValue(this.value, true);
			}

			this.querySelector('input-clab input').addEventListener('blur', this._handleBlur.bind(this));
			this.addEventListener('mousedown', this._handleClick);
			this.addEventListener('mouseup', function (evt) {
				_this.dontHide = false;
			});
		}

		/*---------- 
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_handleHints',
		value: function _handleHints(evt) {
			var _this2 = this;

			// If Enter
			if (evt.keyCode == 13 && this.currentHint != undefined) {
				var i = this._getIndex(this.currentHint, this.options);
				this._setValue(this.options[i]);
				this.querySelector('input-clab input').blur();
				return;
			}

			//If Arrows
			if (this.currentRes.length > 0 && evt.keyCode == 38 && this.currentHint != undefined) {
				evt.preventDefault();
				this._handleArrows('up');
				return;
			}
			if (this.currentRes.length > 0 && evt.keyCode == 40 && this.currentHint != undefined) {
				evt.preventDefault();
				this._handleArrows('down');
				return;
			}

			// If typing
			if (this.inputString.length > this.minChar && !this.noHints) {
				(function () {
					var search = _this2.inputString;
					_this2.currentRes = [];

					_this2.options.forEach(function (opt, i) {
						if (opt.label.search(search) > -1) {
							_this2.set('options.' + i + '.show', true);
							_this2.currentRes.push(_this2.options[i]);
						} else {
							_this2.set('options.' + i + '.show', false);
						}
					});

					if (_this2.currentRes.length > 0) {
						_this2.async(function () {
							_this2._setListHeight(_this2.currentRes.length);
						}, 100);

						_this2._highlightEl(_this2.currentRes, search);
					} else {
						_this2.list.style.height = '0';
						_this2.currentHint = undefined;
					}
				})();
			} else {
				this.list.style.height = '0';
			}
		}
	}, {
		key: '_handleBlur',
		value: function _handleBlur(evt) {
			if (this.dontHide) {
				evt.preventDefault();
				return;
			}
			if (evt) {
				this._closeList();
				if (this.value == undefined || this.value.label != this.inputString) {
					this.inputString = '';
				}
			}
		}
	}, {
		key: '_handleClick',
		value: function _handleClick(evt) {
			//console.log(evt.target);
			if (evt.target.localName == 'ol') {
				this.dontHide = true;
			} else if (evt.target.localName == 'li') {
				this.dontHide = false;
				var i = evt.target.getAttribute('data-index');
				this._setValue(this.options[i]);
			} else {
				this.dontHide = false;
			}
		}

		/*---------- 
  FUNCTIONS
  ----------*/

	}, {
		key: '_setValue',
		value: function _setValue(obj, init) {
			if (init) {
				this.inputString = this.value.label;
				if (this.resultAsObj) this.fire('valueChange', { value: this.value });else this.fire('valueChange', { value: this.inputString });

				return;
			}

			this.value = obj;
			this.inputString = this.value.label;
			this.currentHint = undefined;

			if (this.resultAsObj) this.fire('valueChange', { value: this.value });else this.fire('valueChange', { value: this.inputString });
		}
	}, {
		key: '_highlightEl',
		value: function _highlightEl(res, search) {
			var _this3 = this;

			var i = undefined;
			if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) == 'object') {
				i = this._getIdxForHighlight(res, search);
			} else {
				i = res;
			}

			this.async(function () {
				Array.from(_this3.querySelectorAll('.options-list li')).forEach(function (el) {
					//console.log(el.getAttribute('data-index'),i);
					if (el.getAttribute('data-index') == i) {
						el.classList.add('selected');
					} else {
						el.classList.remove('selected');
					}
				});
			}, 100);
		}
	}, {
		key: '_getIdxForHighlight',
		value: function _getIdxForHighlight(res, search) {
			var _this4 = this;

			var exists = false;
			var idx = undefined;

			res.forEach(function (item, i) {
				if (item.label === search) {
					exists = true;
					idx = _this4._getIndex(item, _this4.options);
					_this4.currentHint = item;
				}
			});

			if (!exists) {
				idx = this._getIndex(res[0], this.options);
				this.currentHint = res[0];
			}

			return idx;
		}
	}, {
		key: '_handleArrows',
		value: function _handleArrows(type) {
			var HIdx = this._getIndex(this.currentHint, this.currentRes);
			var toSel = undefined;

			if (type === 'up') {
				toSel = this.currentRes[HIdx - 1];
				if ((typeof toSel === 'undefined' ? 'undefined' : _typeof(toSel)) == 'object') {
					this.currentHint = toSel;
					this._highlightEl(this._getIndex(toSel, this.options));
					this.querySelector('.options-list').scrollTop -= this.liHeight;
				} else {
					return;
				}
			} else if (type === 'down') {
				toSel = this.currentRes[HIdx + 1];
				if ((typeof toSel === 'undefined' ? 'undefined' : _typeof(toSel)) == 'object') {
					this.currentHint = toSel;
					this._highlightEl(this._getIndex(toSel, this.options));
					this.querySelector('.options-list').scrollTop += this.liHeight;
				} else {
					return;
				}
			}
		}
	}, {
		key: '_closeList',
		value: function _closeList() {
			this.list.style.height = '0';
			Array.from(this.querySelectorAll('.options-list li')).forEach(function (el) {
				el.classList.remove('selected');
			});
		}

		/*---------- 
  COMPUTED VALUES
  ----------*/

		/*---------- 
  UTILS
  ----------*/

	}, {
		key: '_getHeight',
		value: function _getHeight(el) {
			return el.clientHeight;
		}
	}, {
		key: '_getIndex',
		value: function _getIndex(item, items) {
			return items.indexOf(item);
		}
	}, {
		key: '_setListHeight',
		value: function _setListHeight(elemsShown) {
			if (this.liHeight === null) this.liHeight = this._getHeight(this.querySelectorAll('.options-list li')[0]);
			this.list.style.maxHeight = this.liHeight * this.maxInView + 'px';
			this.list.style.height = this.liHeight * elemsShown + 'px';
		}
	}, {
		key: '_dashify',
		value: function _dashify(str) {
			return str.replace(/ /g, '-');
		}
	}, {
		key: '_viewLabel',
		value: function _viewLabel(label) {
			if (label.length > 0) return true;else return false;
		}
	}]);

	return AutoCompleteClab;
})();

Polymer(AutoCompleteClab);