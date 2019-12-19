export default {
	title: {
		type: String,
		value: 'Modal title'
	},
	visible: {
		type: Boolean,
		value: false,
		observer: '_animateShowHide'
	},
	primary: {
		type: String,
		value: null
	},
	secondary: {
		type: String,
		value: null
	},
	warning: {
		type: String,
		value: null
	},
	primaryDisabled: {
		type: Boolean,
		value: false
	},
	content: {
		type: String,
		value: null
	},
	stopClose: {
		type: Boolean,
		value: false
	},
	noAnimation: {
		type: Boolean,
		value: false
	},
	noActions: {
		type: Boolean,
		value: false
	}
};
