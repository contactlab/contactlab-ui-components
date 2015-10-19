Polymer({
	is: 'calendar-clab',
	properties: {
		label: {
			type: String,
			value: 'Date'
		},
		disable: {
			type: Boolean,
			value: false
		},
		inline: {
			type: Boolean,
			value: false
		},
		options: {
			type: Object,
			value: {}
		}
	},
	attached: function(){		
		setTimeout(function(){
			this.inline ? rome(this.querySelector('div.inline-cal'), this.options) : rome(this.querySelector('input'), this.options) ;
		}.bind(this),100)
	}
});