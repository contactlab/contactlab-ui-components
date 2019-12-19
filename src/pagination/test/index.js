import test from 'ava';
import props from '../props';
import {
  _computeActive,
  _getLastPage,
  _getPrevPage,
  _getNextPage,
  _hideIfLast,
  _hideIfFirst,
  _pageNumber,
  _compVisiblePages
} from '../methods/internal';

const element = '<pagination-clab>';

const pages = [...Array(12).keys()];

test(`${element} properties: types & default values`, t => {
  t.is(props.tot.type, Number);
  t.is(props.tot.observer, '_setPages');

  t.is(props.links.type, Array);

  t.is(props.pages.type, Array);
  t.is(props.pages.notify, true);
  t.deepEqual(props.pages.value, []);
  t.is(props.pages.value.length, 0);

  t.is(props.currentPage.type, Number);
  t.is(props.currentPage.notify, true);
  t.is(props.currentPage.value, 0);

  t.is(props.range.type, Number);
  t.is(props.range.value, 8);

  t.is(props.firstPage.type, String);
  t.is(props.firstPage.value, 0);

  t.is(props.lastPage.type, String);
  t.is(props.lastPage.computed, '_getLastPage(pages)');

  t.is(props.prevPage.type, String);
  t.is(props.prevPage.computed, '_getPrevPage(pages, currentPage)');

  t.is(props.nextPage.type, String);
  t.is(props.nextPage.computed, '_getNextPage(pages, currentPage)');

  t.is(props.availableStart.type, Number);
  t.is(props.availableStart.computed, '_getStart(currentPage, pages)');

  t.is(props.availableEnd.type, Number);
  t.is(props.availableEnd.computed, '_getEnd(currentPage, pages)');
});

test(`${element} _computeActive`, t => {
  t.is(_computeActive(), 'page active');
  t.is(_computeActive(2, 1), 'page');
  t.is(_computeActive(2, 2), 'page active');
});

test(`${element} _getLastPage`, t => {
  t.is(_getLastPage(pages), 11);
  t.is(typeof _getLastPage(pages), 'number');
});

test(`${element} _getPrevPage`, t => {
  t.is(_getPrevPage(pages, 5), 4);
  t.is(typeof _getPrevPage(pages, 5), 'number');
});

test(`${element} _getNextPage`, t => {
  t.is(_getNextPage(pages, 5), 6);
  t.is(typeof _getNextPage(pages, 5), 'number');
});

test(`${element} _hideIfLast`, t => {
  t.is(_hideIfLast(1, 3), '');
  t.is(_hideIfLast(2, 3), ' unactive');
  t.is(_hideIfLast(1, 3, 'test'), 'test');
  t.is(_hideIfLast(2, 3, 'test'), 'test unactive');
});

test(`${element} _hideIfFirst`, t => {
  t.is(_hideIfFirst(1), '');
  t.is(_hideIfFirst(0), ' unactive');
  t.is(_hideIfFirst(1, 'test'), 'test');
  t.is(_hideIfFirst(0, 'test'), 'test unactive');
});

test(`${element} _pageNumber`, t => {
  t.is(_pageNumber(1), 2);
  t.is(typeof _pageNumber(1), 'number');
});

test(`${element} _compVisiblePages`, t => {
  const somePages = [...Array(5).keys()];
  const example = _compVisiblePages(2, 4, somePages);
  t.deepEqual(example, [2, 3, 4]);
  t.is(example.length, 3);
});
