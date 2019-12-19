export default {
	/** Label of the checkbox */
	label: {
		type: String
	},
	/** Wrapper style type */
	wrapperType: {
		type: String
	},
	/** Determine if the check is checked or not */
	active: {
		type: Boolean,
		value: false,
		notify: true
	},
	/** Determine if the check is disabled or not */
	disabled: {
		type: Boolean,
		value: false
	}
};
