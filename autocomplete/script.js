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
				hideHints: {
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
					value: 6
				},
				inputType: {
					type: String,
					value: 'success'
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

		// http://jsonplaceholder.typicode.com/todos

	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this.list = this.querySelector('.options-list');
			this.results = [];
			this.currentHint = undefined;
			this.spinner = false;

			/*if(this.options!=undefined){
   	this.options.forEach((opt,i)=>{
   		opt.show=false;
   	});
   }*/
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

				if (this.url != undefined) {
					this.spinner = true;

					fetch(this.url, {
						method: 'GET'
					}).then(function (res) {
						if (res.status !== 200) {
							console.log('Looks like there was a problem. Status Code: ' + res.status);
							_this2.spinner = false;
							_this2.inputType = 'error';
							return;
						}

						res.json().then(function (data) {
							_this2.set('options', data);
							_this2.async(function () {
								_this2._handleHints(true);
							}, 50);
						});
					}).catch(function (err) {
						console.error("Fetch Error ==> ", err);
						_this2.spinner = false;
						_this2.inputType = 'error';
					});
				} else {
					this._handleHints(false);
				}
			} else {
				this._closeList();
			}
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
	}, {
		key: '_handleClick',
		value: function _handleClick(evt) {
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
	}, {
		key: '_highlightThis',
		value: function _highlightThis(evt) {
			var i = evt.target.getAttribute('data-index');
			this._highlightEl(i);
			this.currentHint = this.options[i];
		}

		/*---------- 
  FUNCTIONS
  ----------*/

	}, {
		key: '_handleHints',
		value: function _handleHints(fetched) {
			var _this3 = this;

			var searchVal = this.inputString.toLowerCase();

			if (fetched) {
				this.results = this.options;
				Array.from(this.list.children).forEach(function (el) {
					el.classList.add('show');
				});
			} else {
				(function () {
					var start = new Date().getTime();
					_this3.results = [];

					_this3.options.forEach(function (opt, i) {
						if (opt.label.toLowerCase().search(searchVal) > -1) {
							if (!_this3.spinner && new Date().getTime() - start > 400) _this3.spinner = true;
							_this3.querySelectorAll('.options-list li')[i].classList.add('show');
							_this3.results.push(_this3.options[i]);
						} else {
							if (!_this3.spinner && new Date().getTime() - start > 400) _this3.spinner = true;
							_this3.querySelectorAll('.options-list li')[i].classList.remove('show');
						}
					});
				})();
			}

			this._handleListVisual(searchVal);
		}
	}, {
		key: '_handleListVisual',
		value: function _handleListVisual(searchVal) {
			var _this4 = this;

			if (this.results.length > 0) {
				if (!this.hideHints) {
					this.async(function () {
						_this4._setListHeight(_this4.results.length);
					}, 100);
				}
				this.spinner = false;
				this._highlightEl(this._getMoreAccurateIdxMatch(this.results, searchVal));
				//this.fire('sendRes',this.results);
			} else {
					this._closeList();
					this.spinner = false;
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

			if (this.resultAsObj) this.fire('change', this.value);else this.fire('change', { 'value': this.inputString });
		}
	}, {
		key: '_closeList',
		value: function _closeList() {
			this.list.scrollTop = 0;
			this.list.classList.remove('active');
			Array.from(this.querySelectorAll('.options-list li')).forEach(function (el) {
				el.classList.remove('selected');
			});
		}
	}, {
		key: '_highlightEl',
		value: function _highlightEl(idx) {
			var _this5 = this;

			this.async(function () {
				Array.from(_this5.querySelectorAll('.options-list li')).forEach(function (el) {
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
			res.forEach(function (item, i) {
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

			if (type === 'up') {
				toSel = this.results[HIdx - 1];
				if ((typeof toSel === 'undefined' ? 'undefined' : _typeof(toSel)) == 'object') {
					this._scrollToHighlight(toSel, this._getIndex(toSel, this.options), true);
				} else {
					return;
				}
			} else if (type === 'down') {
				toSel = this.results[HIdx + 1];
				if ((typeof toSel === 'undefined' ? 'undefined' : _typeof(toSel)) == 'object') {
					this._scrollToHighlight(toSel, this._getIndex(toSel, this.options), false);
				} else {
					return;
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
			if (this.liHeight === null) {
				this.list.classList.add('hidden');
				this.liHeight = this._getHeight(this.querySelectorAll('.options-list li.show')[0]);
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