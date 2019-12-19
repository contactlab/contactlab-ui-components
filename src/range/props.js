export default {
	label: {
		type: String
	},
	name: {
		type: String,
		value: 'rangeinput'
	},
	value: {
		type: Number,
		notify: true,
		reflectToAttribute: true
	},
	min: {
		type: Number,
		value: 0
	},
	max: {
		type: Number,
		value: 10
	},
	step: {
		type: Number,
		value: 1
	},
	disabled: {
		type: Boolean,
		value: false
	},
	showDetails: {
		type: Boolean,
		value: false
	}
};
