Polymer({
	is: 'spinner-clab',
	properties: {
		dark: {
			type: Boolean,
			value: false
		},
		big: {
			type: Boolean,
			value: false
		}
	},
	computeClass: function(big,dark){
		var str = 'spinner-overlay ';
		this.dark ? str += ' dark ' : null;
		this.big ? str += ' big ' : null;
		return str;
	}
});