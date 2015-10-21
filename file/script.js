Polymer({
	is: 'file-clab',
	properties: {
		label: {
			type: String,
		},
		name: {
			type: String,
			value: 'textinput'
		},
		value: {
			type: String
		},
		multiple: {
			type: Boolean,
			value: false
		}
	},
	attached: function(){
		var file = this.querySelector('input[type="file"]');
		var input = this.querySelector('input[type="text"]');

		file.addEventListener('change',function(evt){
			var arr = [];
			for (var i = 0; i < file.files.length; i++) {
				arr.push(file.files[i].name);
			}
			input.value = arr.join(', ').replace("C:\\fakepath\\", "");
			this.value = input.value;
		}.bind(this));
	},
	_selection: function(evt){
		this.querySelector('input[type="file"]').click();
	},
	_dashify: function(label){
		var str = label.replace(' ','-');
		return str.toLowerCase();
	},
	_viewLabel: function(label) {
		if(label.length > 0){
			return true;
		} else {
			return false;
		}
	}
});