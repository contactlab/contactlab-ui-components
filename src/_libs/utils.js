'use strict';

/**
 * General utilities.
 * @module _libs/utils
 */

const dashify = (str) => {
  return str.toLowerCase().replace(/ /g, '-');
}

const viewLabel = (label, icon) => {
  let bool = false;
  (label != undefined && label.length > 0) ? bool = true : bool = false;
  (icon != undefined && icon.length > 0) ? bool = true : null;
  return bool;
}

const getIndex = (item, items) => {
  return items.indexOf(item);
}

export { dashify, viewLabel, getIndex };
