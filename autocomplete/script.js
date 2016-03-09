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
			this.is = "autocomplete-clab";
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
				placeholder: {
					type: String,
					value: 'Type..'
				},
				disabled: {
					type: Boolean,
					value: false
				},
				options: {
					type: Array
				},
				url: {
					type: String
				},
				results: {
					type: Array,
					notify: true
				},
				optionsFn: {
					type: Function,
					observer: '_setOptions'
				},
				filter: {
					type: Boolean,
					value: false
				},
				hideHints: {
					type: Boolean,
					value: false
				},
				resultAsObj: {
					type: Boolean,
					value: false
				},
				minChar: {
					type: Number,
					value: 3
				},
				maxInView: {
					type: Number,
					value: 6
				},
				inputType: {
					type: String,
					value: ''
				},
				noteType: {
					type: String
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
			this.results = [];
			this.currentHint = undefined;
			this.spinner = false;
			this.interval;

			if (this.value != undefined) {
				this._setValue(this.value, true);
			}

			this.addEventListener('mousedown', function (evt) {
				switch (evt.target.localName) {
					case 'ol':
						_this.dontHide = true;
						break;
					case 'li':
						_this.dontHide = false;
						var i = evt.target.getAttribute('data-index');
						_this._setValue(_this.options[i]);
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
		key: '_handleKeyboardInputs',
		value: function _handleKeyboardInputs(evt) {
			var _this2 = this;

			// If Enter
			if (evt.keyCode == 13 && this.currentHint != undefined) {
				var i = this._getIndex(this.currentHint, this.options);
				this._setValue(this.options[i]);
				this.querySelector('input-clab input').blur();
				this.results = [];
				return;
			}

			//If Arrows
			if (this.results.length > 0 && evt.keyCode == 38 && this.currentHint != undefined) {
				evt.preventDefault();
				this._handleArrows('up');
				return;
			}
			if (this.results.length > 0 && evt.keyCode == 40 && this.currentHint != undefined) {
				evt.preventDefault();
				this._handleArrows('down');
				return;
			}

			// If typing
			if (this.inputString.length > this.minChar) {
				this.fire('typing');
				if (typeof this.interval == 'number') {
					window.clearTimeout(this.interval);
					this.interval = undefined;
				}

				if (this.url != undefined) {
					this.interval = window.setTimeout(function () {
						_this2._fetchOptions();
					}, 400);
				} else {
					this._showHints(true);
				}
			} else {
				this._closeList();
			}
		}
	}, {
		key: '_handleHighlight',
		value: function _handleHighlight(evt) {
			var i = evt.target.getAttribute('data-index');
			this._highlightEl(i);
			this.currentHint = this.options[i];
		}
	}, {
		key: '_handleBlur',
		value: function _handleBlur(evt) {
			if (this.dontHide) {
				evt.preventDefault();
				return;
			}

			this._closeList();
			if (this.value == undefined || this.value.label != this.inputString) {
				this.inputString = '';
				this.currentHint = undefined;
			}
		}

		/*----------
  FUNCTIONS
  ----------*/

	}, {
		key: '_fetchOptions',
		value: function _fetchOptions() {
			var _this3 = this;

			window.clearTimeout(this.interval);
			this.interval = undefined;
			this._startSpinnerTimeout();

			fetch(this.url, {
				method: 'GET'
			}).then(function (res) {
				if (res.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + res.status);
					_this3.inputType = 'error';
					_this3._resetSpinnerTimeout();
					return;
				}

				res.json().then(function (data) {
					_this3.set('options', data);
					if (_this3.inputType === 'error') _this3.inputType = '';
					_this3.async(function () {
						_this3._showHints(_this3.filter);
						_this3._resetSpinnerTimeout();
					}, 50);
				});
			}).catch(function (err) {
				console.error("Fetch Error ==> ", err);
				_this3.inputType = 'error';
				_this3._resetSpinnerTimeout();
			});
		}
	}, {
		key: '_showHints',
		value: function _showHints(filter) {
			var _this4 = this;

			var searchVal = this.inputString.toLowerCase();

			if (!filter) {
				this.results = this.options;
				Array.prototype.map.call(this.list.children, function (el) {
					el.classList.add('show');
				});
			} else {
				this.results = [];

				this.options.map(function (opt, i) {
					if (opt.label.toLowerCase().search(searchVal) > -1) {
						// this.querySelectorAll('.options-list li')[i].classList.add('show');
						_this4.push('results', _this4.options[i]);
					} else {
						// this.querySelectorAll('.options-list li')[i].classList.remove('show');
					}
				});
			}

			// handle list visual
			if (this.results.length > 0) {
				if (!this.hideHints) {
					this.async(function () {
						_this4._setListHeight(_this4.results.length);
					}, 100);
				}
				this._highlightEl(this._getMoreAccurateIdxMatch(this.results, searchVal));
			} else {
				this._closeList();
				this.currentHint = undefined;
				console.info('No hint was found');
			}
		}
	}, {
		key: '_setValue',
		value: function _setValue(obj) {
			this.set('value', obj);
			this.inputString = this.value.label;
			this.currentHint = undefined;

			if (this.resultAsObj) this.fire('change', { 'selected': this.value });else this.fire('change', { 'selected': this.inputString });
		}
	}, {
		key: '_closeList',
		value: function _closeList() {
			this.list.scrollTop = 0;
			this.list.classList.remove('active');
			Array.prototype.map.call(this.querySelectorAll('.options-list li'), function (el) {
				el.classList.remove('selected');
			});
		}
	}, {
		key: '_highlightEl',
		value: function _highlightEl(idx) {
			var _this5 = this;

			this.async(function () {
				Array.prototype.map.call(_this5.querySelectorAll('.options-list li'), function (el) {
					if (el.getAttribute('data-index') == idx) {
						el.classList.add('selected');
					} else {
						el.classList.remove('selected');
					}
				});
			}, 100);
		}
	}, {
		key: '_getMoreAccurateIdxMatch',
		value: function _getMoreAccurateIdxMatch(res, search) {
			var _this6 = this;

			var isSame = false;
			var idx = undefined;
			res.map(function (item, i) {
				if (item.label === search) {
					isSame = true;
					idx = _this6._getIndex(item, _this6.options);
					_this6.currentHint = item;
				}
			});
			if (!isSame) {
				idx = this._getIndex(res[0], this.options);
				this.currentHint = res[0];
			}
			return idx;
		}
	}, {
		key: '_handleArrows',
		value: function _handleArrows(type) {
			var HIdx = this._getIndex(this.currentHint, this.results);
			var toSel = undefined;

			switch (type) {
				case 'up':
					toSel = this.results[HIdx - 1];
					if ((typeof toSel === 'undefined' ? 'undefined' : _typeof(toSel)) == 'object') {
						this._scrollToHighlight(toSel, this._getIndex(toSel, this.options), true);
					}
					break;
				case 'down':
					toSel = this.results[HIdx + 1];
					if ((typeof toSel === 'undefined' ? 'undefined' : _typeof(toSel)) == 'object') {
						this._scrollToHighlight(toSel, this._getIndex(toSel, this.options), false);
					}

			}
		}
	}, {
		key: '_scrollToHighlight',
		value: function _scrollToHighlight(item, i, goesUp) {
			this.currentHint = item;
			this._highlightEl(i);
			var visible = this._isElemVisible(i);
			if (!visible && !goesUp) this.list.scrollTop += this.list.clientHeight;else if (!visible && goesUp) this.list.scrollTop -= this.list.clientHeight;
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: '_setOptions',
		value: function _setOptions(promise) {
			var _this7 = this;

			promise().then(function (resp) {
				_this7.set('options', resp);
			});
		}

		/*----------
  UTILS
  ----------*/

	}, {
		key: '_setListHeight',
		value: function _setListHeight(elemsShown) {
			if (this.liHeight === null) {
				this.list.classList.add('hidden');
				// this.liHeight = this.querySelectorAll('.options-list li.show')[0].clientHeight;
				this.liHeight = 35;
				this.list.style.maxHeight = this.liHeight * this.maxInView + 'px';
				this.list.classList.remove('hidden');
			}
			this.list.style.height = this.liHeight * elemsShown + 'px';
			this.list.scrollTop = 0;
			if (!this.list.classList.contains('active')) this.list.classList.add('active');
		}
	}, {
		key: '_isElemVisible',
		value: function _isElemVisible(i) {
			var offsetTop = this.list.children[i].offsetTop,
			    scrollTop = this.list.scrollTop,
			    h = this.list.clientHeight;
			if (offsetTop < scrollTop || offsetTop >= scrollTop + h) return false;else return true;
		}
	}, {
		key: '_startSpinnerTimeout',
		value: function _startSpinnerTimeout() {
			var _this8 = this;

			this.interval = window.setTimeout(function () {
				if (!_this8.spinner) _this8.spinner = true;
			}, 400);
		}
	}, {
		key: '_resetSpinnerTimeout',
		value: function _resetSpinnerTimeout() {
			window.clearTimeout(this.interval);
			this.interval = undefined;
			if (this.spinner) this.spinner = false;
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return AutoCompleteClab;
})();

Polymer(AutoCompleteClab);