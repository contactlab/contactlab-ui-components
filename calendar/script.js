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
		// console.log(this.querySelector('input'));
		// console.log(this.inline);
		this.inline ? rome(this.querySelector('div.inline-cal'), this.options) : rome(this.querySelector('input'), this.options) ;
	}
});