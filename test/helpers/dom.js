import {JSDOM} from 'jsdom-wc';

const {window} = new JSDOM(`<!DOCTYPE html>`);

Object.assign(global, {
  document: window.document,
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  window
});

export {window};
