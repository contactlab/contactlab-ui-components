Polymer({
	is: 'button-clab',
	properties: {
		type: {
			type: String,
			value: ''
		},
		appearance: {
			type: String,
			value: ''
		},
		size: {
			type: String,
			value: ''
		},
		icon: {
			type: String,
			value: ''
		},
		disabled: {
			type: Boolean,
			value: false
		}
	},
	_computeClass: function(type,appearance,size){
		return ['btn',type,appearance,size].join(' ');
	},
	_computeIconClass: function(icon){
		return ['icon',icon].join(' ');
	}
});