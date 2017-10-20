'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../props';

const element = '<checkbox-clab>';

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
