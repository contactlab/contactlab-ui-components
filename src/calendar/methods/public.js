'use strict';

import rome from 'rome';
import moment from 'moment';

const getLocale = () => {
  return rome.moment.locale();
}

export { getLocale }
