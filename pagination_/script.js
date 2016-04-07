'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaginationClab = (function () {
	function PaginationClab() {
		_classCallCheck(this, PaginationClab);
	}

	_createClass(PaginationClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "pagination-clab";
			this.properties = {
				pages: {
					type: Array,
					notify: true,
					value: [],
					observer: '_observPages'
				},
				currentPage: {
					type: Number,
					notify: true,
					value: 0,
					observer: '_updateAvailablePages'
				},

				firstPage: {
					type: String,
					computed: '_getFirstPage(pages)'
				},
				lastPage: {
					type: String,
					computed: '_getLastPage(pages)'
				},
				prevPage: {
					type: String,
					computed: '_getPrevPage(pages, currentPage)'
				},
				nextPage: {
					type: String,
					computed: '_getNextPage(pages, currentPage)'
				},
				availableStart: {
					type: Number,
					computed: '_getStart(pages, currentPage)'
				},
				availableEnd: {
					type: Number,
					computed: '_getEnd(pages, currentPage)'
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			this.async(this._updateAvailablePages, 100);
		}
	}, {
		key: '_setThisAsCurrent',
		value: function _setThisAsCurrent(evt) {
			var i = undefined;
			if (typeof evt != 'number') {
				// se è event handler
				evt.preventDefault();
				i = Number(evt.target.getAttribute('data-index'));
			} else {
				// .. o metodo
				i = Number(evt);
			}

			if (i >= 0) {
				this.querySelector('.active').classList.remove('active');
				this.querySelectorAll('.page')[i].classList.add('active');
				this.currentPage = i;

				this.fire('change', { currentPage: i });
			}
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: '_observPages',
		value: function _observPages(val, oldval) {
			if (oldval != undefined) {
				if (this.currentPage > this._getIndex(this.lastPage, this.pages)) {
					// se la currentPage è un valore che ora non c'è più la setto all'ultima pagina di quelle nuove
					this._setThisAsCurrent(this._getIndex(this.lastPage, this.pages));
				} else {
					this.async(this._updateAvailablePages, 100);
				}

				this.fire('update');
			}
		}
	}, {
		key: '_updateAvailablePages',
		value: function _updateAvailablePages() {
			var _this = this;

			Array.prototype.map.call(this.querySelectorAll('.page'), function (el, idx) {
				if (idx >= _this.availableStart && idx <= _this.availableEnd) {
					el.classList.remove('invisible');
				} else {
					el.classList.add('invisible');
				}
			});
		}

		/*----------
  COMPUTED
  ----------*/

	}, {
		key: '_computeLiPageClass',
		value: function _computeLiPageClass(i) {
			var arr = ['page'];
			if (i == this.currentPage) arr.push('active');
			return arr.join(' ');
		}
	}, {
		key: '_getFirstPage',
		value: function _getFirstPage(pages) {
			return pages[0];
		}
	}, {
		key: '_getLastPage',
		value: function _getLastPage(pages) {
			return pages[pages.length - 1];
		}
	}, {
		key: '_getPrevPage',
		value: function _getPrevPage(pages, cur) {
			return pages[cur - 1];
		}
	}, {
		key: '_getNextPage',
		value: function _getNextPage(pages, cur) {
			return pages[cur + 1];
		}
	}, {
		key: '_getStart',
		value: function _getStart(pages, cur) {
			var i = cur;
			var last = pages.length - 1;
			if (i >= last - 3) {
				return last - 4;
			} else if (i <= 3) {
				return 0;
			} else {
				return i - 2;
			}
		}
	}, {
		key: '_getEnd',
		value: function _getEnd(pages, cur) {
			var i = cur;
			var last = pages.length - 1;
			if (i >= last - 3) {
				return last;
			} else if (i <= 3) {
				return 4;
			} else {
				return i + 2;
			}
		}

		/*----------
  UTILS
  ----------*/

	}, {
		key: '_pageNumber',
		value: function _pageNumber(i) {
			return i + 1;
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return PaginationClab;
})();

Polymer(PaginationClab);