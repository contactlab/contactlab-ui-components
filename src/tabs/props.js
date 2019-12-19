export default {
	labels: {
		type: Array,
		value: []
	},
	pills: {
		type: Boolean,
		value: false
	},
	vertical: {
		type: Boolean,
		value: false
	},
	bordered: {
		type: Boolean,
		value: false
	},
	centered: {
		type: Boolean,
		value: false
	},
	active: {
		type: Number,
		value: 0,
		notify: true
	},
	current: {
		type: String,
		notify: true
	},
	_content: {
		type: Array
	}
};
