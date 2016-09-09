'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AutoCompleteClab = function () {
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
				type: {
					type: String
				},
				noteType: {
					type: String
				},
				selected: {
					type: Object,
					value: {},
					observer: '_changedSelected'
				},
				valueField: {
					type: String,
					value: 'value'
				},
				labelField: {
					type: String,
					value: 'label'
				},
				placeholder: {
					type: String,
					value: 'Type..'
				},
				disabled: {
					type: Boolean,
					value: false
				},
				options: Array,
				url: String,
				results: {
					type: Array,
					value: [],
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
				inline: {
					type: Boolean,
					value: false
				},
				labelSize: {
					type: String,
					observer: '_setLabelSize'
				},
				icon: String,

				/*----------
      PRIVATE
    ----------*/
				_inputString: {
					type: String,
					readonly: true
				},
				_currentHint: Object,
				_spinner: {
					type: Boolean,
					value: false
				},
				_interval: Object
			};
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_handleKeyboardInputs',
		value: function _handleKeyboardInputs(evt) {
			var _this = this;

			// If Enter
			if (evt.keyCode == 13 && this._currentHint != undefined) {
				// this.setSelected(this._currentHint);
				this.set('selected', this._currentHint);
				this.querySelector('input-clab input').blur();
				this.results = [];
				return;
			}

			//If Arrows
			if (this.results.length > 0 && evt.keyCode == 38 && this._currentHint != undefined) {
				evt.preventDefault();
				this._handleArrows('up');
				return;
			}
			if (this.results.length > 0 && evt.keyCode == 40 && this._currentHint != undefined) {
				evt.preventDefault();
				this._handleArrows('down');
				return;
			}

			// If typing
			if (this._inputString.length > this.minChar) {
				this.fire('typing');
				if (typeof this._interval == 'number') {
					window.clearTimeout(this._interval);
					this._interval = undefined;
				}

				if (this.url != undefined) {
					this._interval = window.setTimeout(function () {
						_this._fetchOptions();
					}, 400);
				} else {
					this._showHints(true);
				}
			} else {
				this.querySelector('curtain-clab').open = false;
			}
		}
	}, {
		key: '_handleHighlight',
		value: function _handleHighlight(evt) {
			this._currentHint = this.results[evt.detail.index];
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(evt) {
			// this.setSelected(this.results[evt.detail.index]);
			this.set('selected', this.results[evt.detail.index]);
		}
	}, {
		key: '_handleBlur',
		value: function _handleBlur(evt) {
			if (this.dontHide) {
				evt.preventDefault();
				return;
			}

			this.querySelector('curtain-clab').open = false;
			if (this.selected == undefined || this.selected[this.labelField] != this._inputString) {
				this._inputString = '';
				this._currentHint = undefined;
			}
		}

		/*----------
  METHODS
  ----------*/

	}, {
		key: '_fetchOptions',
		value: function _fetchOptions() {
			var _this2 = this;

			window.clearTimeout(this._interval);
			this._interval = undefined;
			this._startSpinnerTimeout();

			fetch(this.url, {
				method: 'GET'
			}).then(function (res) {
				if (res.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + res.status);
					_this2.type = 'error';
					_this2._resetSpinnerTimeout();
					return;
				}

				res.json().then(function (data) {
					_this2.set('options', data);
					if (_this2.type === 'error') _this2.type = '';
					_this2.async(function () {
						_this2._showHints(_this2.filter);
						_this2._resetSpinnerTimeout();
					}, 50);
				});
			}).catch(function (err) {
				console.error("Fetch Error ==> ", err);
				_this2.type = 'error';
				_this2._resetSpinnerTimeout();
			});
		}
	}, {
		key: '_showHints',
		value: function _showHints(filter) {
			var _this3 = this;

			var searchVal = this._inputString.toLowerCase();
			if (!filter) {
				this.set('results', this.options);
			} else {
				(function () {
					var results = [];
					_this3.options.map(function (opt, i) {
						if (opt[_this3.labelField].toLowerCase().search(searchVal) > -1) results.push(_this3.options[i]);
					});
					_this3.set('results', results);
				})();
			}

			// handle list visual
			if (this.results.length > 0) {
				this._currentHint = this.results[0];
				this.querySelector('curtain-clab').open = true;
			} else {
				this.querySelector('curtain-clab').open = false;
				this._currentHint = undefined;
				console.info('No hint was found');
			}
		}
	}, {
		key: '_handleArrows',
		value: function _handleArrows(type) {
			var HIdx = this._getIndex(this._currentHint, this.results);
			var item = void 0;
			switch (type) {
				case 'up':
					item = this.results[HIdx - 1];
					if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object') {
						this._currentHint = item;
						this.querySelector('curtain-clab').scrollToHighlight(HIdx - 1, true);
					}
					break;
				case 'down':
					item = this.results[HIdx + 1];
					if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object') {
						this._currentHint = item;
						this.querySelector('curtain-clab').scrollToHighlight(HIdx + 1, false);
					}
					break;
			}
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: '_setOptions',
		value: function _setOptions(promise) {
			var _this4 = this;

			promise().then(function (resp) {
				_this4.set('options', resp);
			});
		}
	}, {
		key: '_changedSelected',
		value: function _changedSelected(val, old) {
			if (val != undefined && Object.keys(val).length > 0) {
				this._inputString = this.selected[this.labelField];
				this._currentHint = undefined;

				if (this.resultAsObj) this.fire('change', { 'selected': this.selected, 'value': this.selected });else this.fire('change', { 'selected': this.selected.label, 'value': this.selected.label });
			}
		}

		/*----------
  UTILS
  ----------*/

	}, {
		key: '_startSpinnerTimeout',
		value: function _startSpinnerTimeout() {
			var _this5 = this;

			this._interval = window.setTimeout(function () {
				if (!_this5._spinner) _this5._spinner = true;
			}, 400);
		}
	}, {
		key: '_resetSpinnerTimeout',
		value: function _resetSpinnerTimeout() {
			window.clearTimeout(this._interval);
			this._interval = undefined;
			if (this._spinner) this._spinner = false;
		}
	}, {
		key: '_setLabelSize',
		value: function _setLabelSize(newSize) {
			this.set("labelSize", newSize);
		}

		/*----------
  PUBLIC
  ----------*/

	}, {
		key: 'setSelected',
		value: function setSelected(obj) {
			this.set('selected', obj);
			// this._inputString=this.selected[this.labelField];
			// this._currentHint=undefined;
			//
			// if(this.resultAsObj) this.fire('change', {'selected':this.selected});
			// 	else this.fire('change', {'selected':this._inputString});
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return AutoCompleteClab;
}();

Polymer(AutoCompleteClab);