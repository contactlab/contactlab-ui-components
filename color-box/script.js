Polymer({
	is: 'color-box',
	properties: {
		label: {
			type: String,
			value: "Color Name"
		},
		hex:{
			type: String,
			value: "000000"
		}
	},
	getClass: function(str){
		return str.toLowerCase().replace(' ','-');
	}
});