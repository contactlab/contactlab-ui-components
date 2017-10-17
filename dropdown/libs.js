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


export { isNil, isNilOrEmptyStr, randomId, propLowerCase }
