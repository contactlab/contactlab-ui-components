Polymer({
	is: 'panel-clab',
	properties: {
		title: {
			type: String,
			value: 'Title'
		},
		type: {
			type: String,
			value: ''
		}
	},
	_computeType: function(type){
		return ['panel',type].join(' ');
	}
});