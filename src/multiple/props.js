export default {
	label: {
		type: String,
		value: null
	},
	type: {
		type: String,
		value: ''
	},
	options: {
		type: Array,
		value: []
	},
	optionsFn: {
		type: Function,
		observer: '_setOptions'
	},
	url: {
		type: String
	},
	selected: {
		type: Array,
		value: [],
		notify: true
	},
	name: {
		type: String,
		value: 'multiple select'
	},
	disabled: {
		type: Boolean,
		value: false,
		observer: '_disabledChanged'
	},
	maxInView: {
		type: Number,
		value: 6
	},
	spinner: {
		type: Boolean,
		value: false
	},
	noteType: {
		type: String
	}
};
