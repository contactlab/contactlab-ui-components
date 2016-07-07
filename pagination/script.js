'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaginationClab = function () {
	function PaginationClab() {
		_classCallCheck(this, PaginationClab);
	}

	_createClass(PaginationClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "pagination-clab";
			this.properties = {
				tot: {
					type: Number,
					observer: '_setPages'
				},
				links: Array,
				pages: {
					type: Array,
					notify: true,
					value: []
				},
				currentPage: {
					type: Number,
					notify: true,
					value: 0
				},
				range: {
					type: Number,
					value: 8
				},
				firstPage: {
					type: String,
					value: 0
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
					computed: '_getStart(currentPage, pages)'
				},
				availableEnd: {
					type: Number,
					computed: '_getEnd(currentPage, pages)'
				}
			};
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_setCurrent',
		value: function _setCurrent(evt) {
			var i = void 0;
			var type = void 0;
			switch (evt.target.localName) {
				case 'i':
					i = Number(evt.target.parentNode.getAttribute('data-index'));
					type = evt.target.parentNode.getAttribute('data-type');
					break;
				case 'li':
					i = Number(evt.target.getAttribute('data-index'));
					type = evt.target.getAttribute('data-type');
					break;
			}

			if (type && this[type + 'Page'] == undefined || type && this[type + 'Page'] == this.currentPage) return;
			if (i >= 0 && i <= this.lastPage) {
				this.set('currentPage', i);
				this.fire('change', { currentPage: i });
			}
		}

		/*----------
  OBSERVERS
  ----------*/

	}, {
		key: '_setPages',
		value: function _setPages(val) {
			if (val != undefined) {
				var arr = [];
				for (var i = 0; i < val; i++) {
					arr.push(i);
				}
				this.set('pages', arr);
			}
		}

		/*----------
  COMPUTERS
  ----------*/

	}, {
		key: '_compVisiblePages',
		value: function _compVisiblePages(start, end) {
			var arr = [];
			this.pages.map(function (page, idx) {
				if (idx >= start && idx <= end) {
					arr.push(page);
				}
			});
			return arr;
		}
	}, {
		key: '_computeActive',
		value: function _computeActive(cur, i) {
			var arr = ['page'];
			if (i == cur) arr.push('active');
			return arr.join(' ');
		}
	}, {
		key: '_getLastPage',
		value: function _getLastPage(pages) {
			return pages.length - 1;
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
		value: function _getStart(c, pages) {
			var last = pages.length - 1;
			if (c >= last - this.range / 2) {
				return last - this.range;
			} else if (c <= this.range / 2) {
				return 0;
			} else {
				return c - this.range / 2;
			}
		}
	}, {
		key: '_getEnd',
		value: function _getEnd(c, pages) {
			var last = pages.length - 1;
			if (c >= last - this.range / 2) {
				return last;
			} else if (c <= this.range / 2) {
				return this.range;
			} else {
				return c + this.range / 2;
			}
		}
	}, {
		key: '_hideIfLast',
		value: function _hideIfLast(current, tot, str) {
			var text = str ? str : '';
			return current == tot - 1 ? text += ' unactive' : text;
		}
	}, {
		key: '_hideIfFirst',
		value: function _hideIfFirst(current, str) {
			var text = str ? str : '';
			return current == 0 ? text += ' unactive' : text;
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
}();

Polymer(PaginationClab);