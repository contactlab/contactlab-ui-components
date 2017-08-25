'use strict';

const _computeClass = (big, dark) => {
  const arr = ['spinner-overlay'];
  this.dark ? arr.push('dark') : null;
  this.big ? arr.push('big') : null;
  return arr.join(' ');
}

const _computeBgColor = (color) => {
  return 'background-color: rgba(' + color + ')';
}

export { _computeClass, _computeBgColor }
