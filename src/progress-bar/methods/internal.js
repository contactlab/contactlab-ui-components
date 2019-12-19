const _percent = value => {
	return value + '%';
};

const _computeClass = (minimal, type) => {
	const arr = ['progress-bar'];
	if (minimal) arr.push('minimal');
	if (type != null) arr.push(type);
	return arr.join(' ');
};

const _computeProp = value => {
	return `width:${value}%;`;
};

export {_percent, _computeClass, _computeProp};
