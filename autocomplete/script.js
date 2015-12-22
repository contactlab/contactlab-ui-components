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

		// http://jsonplaceholder.typicode.com/todos

	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this.list = this.querySelector('.options-list');
			this.results = [];
			this.currentHint = undefined;

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
		key: '_handleHints',
		value: function _handleHints(evt) {
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

				if (this.url != undefined && this.options == undefined) {
					fetch(this.url).then(function (res) {
						return res.json();
					}).then(function (obj) {
						_this2.set('options', obj);
						//console.log(this.options);
						_this2._searchForHints();
					});
				} else {
					this._searchForHints();
				}
			} else {
				if (this.list.classList.contains('active')) this.list.classList.remove('active');
			}
		}
	}, {
		key: '_searchForHints',
		value: function _searchForHints() {
			var _this3 = this;

			var search = this.inputString;
			this.results = [];

			this.options.forEach(function (opt, i) {
				if (opt.label.search(search) > -1) {
					//this.set('options.'+i+'.show', true);
					_this3.querySelectorAll('.options-list li')[i].classList.add('show');
					_this3.results.push(_this3.options[i]);
				} else {
					//this.set('options.'+i+'.show', false);
					_this3.querySelectorAll('.options-list li')[i].classList.remove('show');
				}
			});

			if (this.results.length > 0) {
				if (!this.hideHints) {
					this.async(function () {
						_this3._setListHeight(_this3.results.length);
					}, 100);
				}
				this._highlightEl(this._getIdxForHighlight(this.results, search));
				//this.fire('sendRes',this.results);
			} else {
					if (this.list.classList.contains('active')) this.list.classList.remove('active');
					this.currentHint = undefined;
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
		value: function _setValue(obj) {
			this.set('value', obj);
			this.inputString = this.value.label;
			this.currentHint = undefined;

			if (this.resultAsObj) this.fire('change', this.value);else this.fire('change', { 'value': this.inputString });
		}
	}, {
		key: '_highlightEl',
		value: function _highlightEl(idx) {
			var _this4 = this;

			var i = idx;
			this.async(function () {
				Array.from(_this4.querySelectorAll('.options-list li')).forEach(function (el) {
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
			var _this5 = this;

			var exists = false;
			var idx = undefined;
			res.forEach(function (item, i) {
				if (item.label === search) {
					exists = true;
					idx = _this5._getIndex(item, _this5.options);
					_this5.currentHint = item;
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
			var HIdx = this._getIndex(this.currentHint, this.results);
			var toSel = undefined;

			if (type === 'up') {
				toSel = this.results[HIdx - 1];
				if ((typeof toSel === 'undefined' ? 'undefined' : _typeof(toSel)) == 'object') {
					this.currentHint = toSel;
					this._highlightEl(this._getIndex(toSel, this.options));
					this.querySelector('.options-list').scrollTop -= this.liHeight;
				} else {
					return;
				}
			} else if (type === 'down') {
				toSel = this.results[HIdx + 1];
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
			this.list.classList.remove('active');
			Array.from(this.querySelectorAll('.options-list li')).forEach(function (el) {
				el.classList.remove('selected');
			});
		}
	}, {
		key: '_fetchJSON',
		value: function _fetchJSON(url) {
			var _this6 = this;

			fetch(url).then(function (res) {
				return res.json();
			}).then(function (obj) {
				_this6.set('options', obj);
			});
		}

		/*---------- 
  OBSERVERS
  ----------*/

	}, {
		key: '_setOptions',
		value: function _setOptions(promise) {
			var _this7 = this;

			promise().then(function (resp) {
				_this7.options = resp;
				//this.liHeight = this.$.list.children[0].clientHeight;
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
			this.list.classList.add('active');
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