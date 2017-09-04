// @flow

'use strict';

const _computeType = (str, type) => {
  return [str, type].join(' ');
}

const _getLocale = (options) => {
  const thisLocale = options.locale ? options.locale : 'en';
  return thisLocale;
}

const _getFormat = (options, romeInst)=> {
  const thisFormat = options.inputFormat ? options.inputFormat : romeInst.options().inputFormat;
  return thisFormat;
}

export { _computeType, _getLocale, _getFormat }
