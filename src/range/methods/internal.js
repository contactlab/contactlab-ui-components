const _computeRangeWrapperClasses = show => {
	const arr = ['range-wrapper'];
	show ? arr.push('details') : null;
	return arr.join(' ');
};

const _compDisabled = disabled => {
	return disabled ? 'disabled' : null;
};

export {_computeRangeWrapperClasses, _compDisabled};
