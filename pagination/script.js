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
					value: []
				},
				currentPage: {
					type: Number,
					notify: true,
					value: 1,
					observer: '_updateAvailablePages'
				},
				/*range: {
    	type: Number,
    	value: 5
    }, -------------> to implement later, maybe */

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
			this.async(function () {
				this.querySelectorAll('.page')[this.currentPage - 1].classList.add('active');
				this._updateAvailablePages();
				this.addEventListener('pageChanged', this.updateSelectedPage);
			}, 500);
		}
	}, {
		key: 'updateSelectedPage',
		value: function updateSelectedPage(e) {
			var i = e.detail.index;
			this.$$('.active').classList.remove('active');
			this.querySelectorAll('.page')[i].classList.add('active');
			this.currentPage = Number(i) + 1;
		}
	}, {
		key: 'setThisAsCurrent',
		value: function setThisAsCurrent(e) {
			e.preventDefault(); // forse da togliere

			if (e.path[0].getAttribute('data-index') != null) var i = e.path[0].getAttribute('data-index');else var i = e.target.children[0].getAttribute('data-index');

			if (i >= 0) {
				this.fire('pageChanged', { index: i });
			}
		}

		// computed values

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
			return pages[cur - 2];
		}
	}, {
		key: '_getNextPage',
		value: function _getNextPage(pages, cur) {
			return pages[cur];
		}
	}, {
		key: '_getStart',
		value: function _getStart(pages, cur) {
			var i = cur - 1;
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
			var i = cur - 1;
			var last = pages.length - 1;
			if (i >= last - 3) {
				return last;
			} else if (i <= 3) {
				return 4;
			} else {
				return i + 2;
			}
		}

		// functions to retrieve values

	}, {
		key: '_pageNumber',
		value: function _pageNumber(i) {
			return i + 1;
		}
	}, {
		key: '_getIndex',
		value: function _getIndex(content) {
			return this.pages.indexOf(content);
		}

		// observers

	}, {
		key: '_updateAvailablePages',
		value: function _updateAvailablePages() {
			for (var idx in Array.from(this.querySelectorAll('.page'))) {
				var pagesEl = this.querySelectorAll('.page');
				if (idx >= this.availableStart && idx <= this.availableEnd) {
					pagesEl[idx].classList.remove('invisible');
				} else {
					pagesEl[idx].classList.add('invisible');
				}
			}
		}
	}]);

	return PaginationClab;
})();

Polymer(PaginationClab);