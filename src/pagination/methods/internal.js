const _computeActive = (cur, i) => (i === cur ? 'page active' : 'page');

const _getLastPage = pages => pages.length - 1;

const _getPrevPage = (pages, cur) => pages[cur - 1];

const _getNextPage = (pages, cur) => pages[cur + 1];

const _hideIfLast = (current, tot, str = '') =>
	current === tot - 1 ? `${str} unactive` : str;

const _hideIfFirst = (current, str = '') =>
	current === 0 ? `${str} unactive` : str;

const _pageNumber = i => i + 1;

const _compVisiblePages = (start, end, pages) =>
	pages
		.map((page, idx) => {
			return idx >= start && idx <= end ? page : null;
		})
		.filter(e => typeof e === 'number');

export {
	_computeActive,
	_getLastPage,
	_getPrevPage,
	_getNextPage,
	_hideIfLast,
	_hideIfFirst,
	_pageNumber,
	_compVisiblePages
};
