'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultipleClab = function () {
	function MultipleClab() {
		_classCallCheck(this, MultipleClab);
	}

	_createClass(MultipleClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "multiple-clab";
			this.properties = {
				label: {
					type: String,
					value: null
				},
				type: {
					type: String,
					value: ''
				},
				options: {
					type: Array,
					value: []
				},
				optionsFn: {
					type: Function,
					observer: '_setOptions'
				},
				url: {
					type: String
				},
				selected: {
					type: Array,
					value: [],
					notify: true
				},
				name: {
					type: String,
					value: 'multiple select'
				},
				disabled: {
					type: Boolean,
					value: false,
					observer: '_disabledChanged'
				},
				maxInView: {
					type: Number,
					value: 6
				},
				spinner: {
					type: Boolean,
					value: false
				},
				noteType: {
					type: String
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			// Fetch options
			if (this.url != undefined) {
				(function () {
					var timeoutID = window.setTimeout(function () {
						_this.spinner = true;
					}, 400);

					fetch(_this.url, {
						method: 'GET'
					}).then(function (res) {
						if (res.status !== 200) {
							console.log('Looks like there was a problem. Status Code: ' + res.status);

							window.clearTimeout(timeoutID);
							timeoutID = undefined;
							if (_this.spinner) _this.spinner = false;
							return;
						}
						res.json().then(function (data) {
							_this.set('options', data);
							window.clearTimeout(timeoutID);
							timeoutID = undefined;
							if (_this.spinner) _this.spinner = false;

							_this.async(function () {
								_this._setWrapperHeights();
							}, 100);
						});
					}).catch(function (err) {
						console.error("Fetch Error ==> ", err);

						_this.type = 'error';
						window.clearTimeout(timeoutID);
						timeoutID = undefined;
						if (_this.spinner) _this.spinner = false;
					});
				})();
			} else {
				this.async(function () {
					_this._setWrapperHeights();
				}, 100);
			}

			// Global vars
			this.lastSelected = undefined;
			this.shift = false;
			this.ctrl = false;

			// Listen for key events
			document.querySelector('body').addEventListener('keydown', this._handleKeys.bind(this));
			document.querySelector('body').addEventListener('keyup', this._handleKeys.bind(this));
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_handleSelection',
		value: function _handleSelection(evt) {
			if (this.disabled) return;

			if (!this.shift && !this.ctrl) {
				// starting the select
				this.set('selected', []);
				Array.prototype.map.call(this.querySelectorAll('.options-list li'), function (el) {
					el.classList.remove('selected');
				});
				this._selectThis(evt.target);
			} else if (this.ctrl) {
				//adding or removing single select
				if (evt.target.classList.contains('selected')) this._removeThis(evt.target);else {
					this._selectThis(evt.target);
				}
			} else if (this.shift) {
				//adding multiple select
				if (this.lastSelected != undefined) this._selectThese(evt.target.getAttribute('data-index'));
			}
		}
	}, {
		key: '_handleKeys',
		value: function _handleKeys(evt) {
			if (this.disabled) return;

			switch (evt.type) {
				case 'keydown':
					switch (evt.keyCode) {
						case 16:
							this.shift = true;
							break;
						case 17:
							this.ctrl = true;
							break;
					}
					break;
				case 'keyup':
					this.shift = false;
					this.ctrl = false;
					break;
			}
		}
	}, {
		key: '_loadContent',
		value: function _loadContent(evt) {
			var _this2 = this;

			if (this.disabled) return;

			var maxScrollable = evt.target.scrollHeight - evt.target.clientHeight;
			if (evt.target.scrollTop == maxScrollable) {
				evt.preventDefault();

				if (this.url != undefined) {
					(function () {
						//load more content
						var timeoutID = window.setTimeout(function () {
							_this2.spinner = true;
						}, 400);

						fetch(_this2.url, {
							method: 'GET'
						}).then(function (res) {
							if (res.status !== 200) {
								console.log('Looks like there was a problem. Status Code: ' + res.status);
								if (typeof timeoutID == 'number') {
									window.clearTimeout(timeoutID);
									timeoutID = undefined;
									_this2.spinner = false;
								}
								return;
							}
							res.json().then(function (data) {
								var newData = _this2.options.concat(data);
								_this2.set('options', newData);

								if (typeof timeoutID == 'number') {
									window.clearTimeout(timeoutID);
									timeoutID = undefined;
									_this2.spinner = false;
								}
							});
						});
					})();
				}
			}
		}

		/*----------
  METHODS
  ----------*/

	}, {
		key: '_selectThis',
		value: function _selectThis(elem) {
			var i = elem.getAttribute('data-index');
			elem.classList.add('selected');
			this.push('selected', this.options[i]);
			this.fire('change', { selected: this.selected });
			this.lastSelected = i;
		}
	}, {
		key: '_removeThis',
		value: function _removeThis(elem) {
			var i = elem.getAttribute('data-index');
			console.log(i);
			elem.classList.remove('selected');
			this.splice('selected', i, 1);
			this.fire('change', { selected: this.selected });
			this.lastSelected = undefined;
		}
	}, {
		key: '_selectThese',
		value: function _selectThese(lastClicked) {
			var arr = [],
			    first = undefined,
			    last = undefined;
			if (this.lastSelected > lastClicked) {
				first = lastClicked;
				last = this.lastSelected;
			} else {
				first = this.lastSelected;
				last = lastClicked;
			}

			for (var i = first; i <= last; i++) {
				arr.push(i);
				if (this.selected.indexOf(this.options[i]) == -1) this.push('selected', this.options[i]);
			}

			this._highlightElems(arr);
			this.fire('change', { selected: this.selected });
		}
	}, {
		key: '_highlightElems',
		value: function _highlightElems(idx) {
			var _this3 = this;

			this.async(function () {
				idx.map(function (i) {
					Array.prototype.map.call(_this3.querySelectorAll('.options-list li'), function (el) {
						if (el.getAttribute('data-index') == i) {
							el.classList.add('selected');
						}
					});
				});
			}, 100);
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
		key: '_disabledChanged',
		value: function _disabledChanged(newVal, oldVal) {
			if (newVal) this.type = 'disabled';
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: '_compWrapperType',
		value: function _compWrapperType(type) {
			var arr = ['multiple-wrapper'];
			if (type) arr.push(type);
			return arr.join(' ');
		}

		/*----------
  UTILITIES
  ----------*/

	}, {
		key: '_setWrapperHeights',
		value: function _setWrapperHeights() {
			if (this.liHeight == undefined) this.liHeight = this.querySelectorAll('.options-list li')[0].clientHeight;
			this.querySelector('.options-list').style.maxHeight = this.liHeight * this.maxInView + 'px';
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return MultipleClab;
}();

Polymer(MultipleClab);