'use strict';

import rome from 'rome';
import moment from 'moment';

const clear = (romeInstance, value, valueStr) => {
  value = '';
  valueStr = null;
  romeInstance.setValue(moment().format());
  return { romeInstance, value, valueStr }
}

const getLocale = () => {
  return rome.moment.locale();
}

export { clear, getLocale }
