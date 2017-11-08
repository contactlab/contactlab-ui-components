'use strict';

const isNil = val => val === null || typeof val === 'undefined';

const isNilOrEmptyStr = str => isNil(str) || str === '';

const randomId = () => {
  let id = '';
  let possible = "abcdefghijklmnopqrstuvwxyz";
  let n = Math.floor(Math.random() * (999 - 0) + 0);
  let time = Date.now();
  for (var i = 0; i < 2; i++) id += possible.charAt(Math.floor(Math.random() * possible.length));
  id += n;
  id += time;
  return id;
}

const propLowerCase = (obj, key) =>
  !isNil(obj) && !isNil(obj[key])
    ? obj[key].toLowerCase()
    : '';


const escapeString = s => {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const setOptionsList = (options, searchValue, labelField) => {
  if(!isNil(options) && options.constructor === Array) {
    const toSearch = !isNilOrEmptyStr(searchValue)
      ? searchValue.toLowerCase()
      : '';
    const _toSearch = escapeString(toSearch);
    const optionsVisible = options.filter(o => propLowerCase(o, labelField).search(_toSearch) > -1);
    return optionsVisible;
  }
  return [];
}

export { isNil, isNilOrEmptyStr, randomId, propLowerCase, escapeString, setOptionsList }
