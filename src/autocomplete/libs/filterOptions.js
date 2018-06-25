import escapeStringRegexp from 'escape-string-regexp';

const filterOptions = (filter, str, labelField, options) => {
  if(!filter) {
    return options;
  }

  const searchVal = escapeStringRegexp(str.toLowerCase());
  return options.filter(opt => {
    return opt[labelField].toLowerCase().search(searchVal) > -1
  });
};

export default filterOptions;