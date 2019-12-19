import rome from 'rome';

const getLocale = () => {
	return rome.moment.locale();
};

export {getLocale};
