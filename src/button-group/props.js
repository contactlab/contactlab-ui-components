export default {
	/**
	 * Additional class
	 */
	type: {
		type: String,
		value: ''
	},
	/**
	 * `size` additional class for the size of the buttons
	 */
	size: {
		type: String,
		value: ''
	},
	/**
	 * Whether the buttons are disabled
	 */
	disabled: {
		type: Boolean,
		value: false,
		observer: '_updateDisabled'
	},
	/**
	 * Index of the button active at init
	 */
	value: {
		type: Number,
		value: 0,
		observer: '_updateAppearance',
		reflectToAttribute: true
	}
};
