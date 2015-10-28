Polymer({
	is: 'label-clab',
	properties: {
		type: {
			type: String,
			value: ''
		},
		counter: {
			type: Number,
			value: null
		},
		remove: {
			type: Boolean,
			value: false
		},
		badge: {
			type: Boolean,
			value: false
		}
	},
	_computeClass: function(badge,type){
		var str = badge ? 'badge' : 'label';
		return [str,type].join(' ');
	},
	_removeClicked: function(){
		this.fire('remove');
	}
});