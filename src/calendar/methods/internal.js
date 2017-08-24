// @flow

'use strict';

const _computeType = (str: string, type: string): string => {
  return [str, type].join(' ');
}

const _getLocale = (options: {}): string => {
  const thisLocale = options.locale ? options.locale : 'en';
  return thisLocale;
}

const _getFormat = (options: {}, romeInst: {}): string => {
  const thisFormat = options.inputFormat ? options.inputFormat : romeInst.options().inputFormat;
  return thisFormat;
}

export { _computeType, _getLocale, _getFormat }
