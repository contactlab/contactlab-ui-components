Polymer({
	is: 'card-clab',
	properties:{
		title: {
			type: String,
			value: 'Title'
		},
		primaryLabel: {
			type: String,
			value: 'OK'
		},
		secondaryLabel: {
			type: String,
			value: 'Cancel'
		},
		icon: {
			type: String,
			value: ''
		},
		big: {
			type: Boolean,
			value: false
		},
		table: {
			type: Boolean,
			value: false
		},
		figure: {
			type: String,
			value: null
		},
		effect: {
			type: String,
			value: ''
		}
	},
	_computeIconClass: function(icon){
		return icon;
	},
	_computeCardClass: function(big){
		var classes = ['card-title'];
		big ? classes.push('big-icon') : null;
		return classes.join(' ');
	},
	_computeEffectClass: function(effect){
		return ['card', effect].join(' ');
	}
});