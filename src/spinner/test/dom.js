import test from 'ava';
import { JSDOM } from 'jsdom-wc';

const { window } = new JSDOM(`<!DOCTYPE html>`);

Object.assign(global, {
  document: window.document,
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  window,
});

const bundle = document.createElement('script');
bundle.src = './../../../demo/components.js'

const element = 'spinner-clab';
document.body.appendChild(bundle);
document.body.appendChild(document.createElement(element));
const elem = document.body.querySelector(element);

test(`<${element}> in DOM`, t => {
  t.is(elem.outerHTML, '<spinner-clab></spinner-clab>');
  t.is(elem.position, undefined);
  t.is(elem.background, undefined);
  t.is(elem.color, undefined);
  t.is(elem.visible, undefined);
  t.is(elem.small, undefined);
  t.is(elem.big, undefined);
  t.is(elem.dark, undefined);
});
