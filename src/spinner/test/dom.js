'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import { JSDOM } from 'jsdom-wc';

const { window } = new JSDOM(`<!DOCTYPE html>`);

const element = '<spinner-clab>';


Object.assign(global, {
  document: window.document,
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  window,
});

const bundle = document.createElement('script');
bundle.src = './../../../demo/components.js'

document.body.appendChild(bundle);
document.body.appendChild(document.createElement('spinner-clab'));

const elem = document.body.querySelector('spinner-clab');

test(`${element} in DOM`, t => {
  // console.log(elem.tagName, elem.id);
  t.is(elem.outerHTML, '<spinner-clab></spinner-clab>');
  t.is(elem.dark, undefined);
});
