'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultipleClab = (function () {
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
					value: 'success'
				},
				options: {
					type: Array,
					value: [{ value: 'A', label: 'Option 1' }, { value: 'B', label: 'Option 2' }, { value: 'C', label: 'Option 3' }, { value: 'D', label: 'Option 4' }, { value: 'E', label: 'Option 5' }]
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
					value: false
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
					type: String,
					value: ''
				},

				compNoteType: {
					type: String,
					computed: '_computeNoteType(type, noteType)'
				}
			};
		}
	}, {
		key: 'ready',
		value: function ready() {
			var _this = this;

			if (this.disabled) this.type = 'disabled';

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
							return;
						}
						res.json().then(function (data) {
							_this.set('options', data);

							if (typeof timeoutID == 'number') {
								window.clearTimeout(timeoutID);
								timeoutID = undefined;
								_this.spinner = false;
							}
						});
					});
				})();
			}
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this2 = this;

			// Set wrapper height
			this.async(function () {
				_this2._setWrapperHeights();
			}, 100);

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
				Array.from(this.querySelectorAll('.options-list li')).forEach(function (el) {
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

			if (evt.type == 'keydown' && evt.keyCode == 16) {
				this.shift = true;
			} else if (evt.type == 'keydown' && evt.keyCode == 17) {
				this.ctrl = true;
			} else if (evt.type == 'keyup') {
				this.shift = false;
				this.ctrl = false;
			}
		}
	}, {
		key: '_loadContent',
		value: function _loadContent(evt) {
			var _this3 = this;

			if (this.disabled) return;

			var maxScrollable = evt.target.scrollHeight - evt.target.clientHeight;
			if (evt.target.scrollTop == maxScrollable) {
				evt.preventDefault();

				if (this.url != undefined) {
					(function () {
						//load more content
						var timeoutID = window.setTimeout(function () {
							_this3.spinner = true;
						}, 400);

						fetch(_this3.url, {
							method: 'GET'
						}).then(function (res) {
							if (res.status !== 200) {
								console.log('Looks like there was a problem. Status Code: ' + res.status);
								return;
							}
							res.json().then(function (data) {
								var newData = _this3.options.concat(data);
								_this3.set('options', newData);

								if (typeof timeoutID == 'number') {
									window.clearTimeout(timeoutID);
									timeoutID = undefined;
									_this3.spinner = false;
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
			var _this4 = this;

			this.async(function () {
				idx.forEach(function (i) {
					Array.from(_this4.querySelectorAll('.options-list li')).forEach(function (el) {
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
			var _this5 = this;

			promise().then(function (resp) {
				_this5.set('options', resp);
			});
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
	}, {
		key: '_computeNoteType',
		value: function _computeNoteType(type, noteType) {
			return [type, noteType].join(' ');
		}

		/*---------- 
  UTILITIES	
  ----------*/

	}, {
		key: '_dashify',
		value: function _dashify(str) {
			return str.replace(/ /g, '-');
		}
	}, {
		key: '_getIndex',
		value: function _getIndex(item, array) {
			return array.indexOf(item);
		}
	}, {
		key: '_setWrapperHeights',
		value: function _setWrapperHeights() {
			this.liHeight = this.querySelectorAll('.options-list li')[0].clientHeight;
			this.querySelector('.options-list').style.maxHeight = this.liHeight * this.maxInView + 'px';
		}
	}]);

	return MultipleClab;
})();

Polymer(MultipleClab);