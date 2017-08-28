'use strict';

const _computeClass = (type, appearance, size, block) => {
  const arr = ['btn', type, appearance, size];
  block ? arr.push('block') : null;
  return arr.join(' ');
}

const _computeIconClass = (icon) => {
  return ['icon', icon].join(' ');
}

export {
  _computeClass,
  _computeIconClass
}
