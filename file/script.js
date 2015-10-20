Polymer({
	is: 'file-clab',
	properties: {
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
	}
});