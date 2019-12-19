export default {
	type: {
		type: String
	},
	classes: {
		type: String,
		computed: 'computeClasses(type)',
		readonly: true
	}
};
