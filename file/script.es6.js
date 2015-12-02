class FileClab{

	beforeRegister(){
		this.is = "file-clab";
		this.properties = {
			label: {
				type: String,
			},
			name: {
				type: String,
				value: 'textinput'
			},
			type: {
				type: String,
				value: ''
			},
			value: {
				type: String
			},
			multiple: {
				type: Boolean,
				value: false
			},
			noteType: {
				type: String,
				value: ''
			},

			compNoteType: {
				type: String,
				computed: 'computeNoteType(type, noteType)'
			}
		}
	}


	attached(){
		let fileInput = this.querySelector('input[type="file"]');
		let textInput = this.querySelector('input[type="text"]');

		fileInput.addEventListener('change',(evt) => {
			let arr = [];
			Array.from(fileInput.files).forEach(file => {
				arr.push(file.name);
			});
			/*for (var i = 0; i < file.files.length; i++) {
				arr.push(file.files[i].name);
			}*/
			textInput.value = arr.join(', ').replace("C:\\fakepath\\", "");
			this.value = textInput.value;
		});
	}

	computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}


	_selection(evt){
		this.querySelector('input[type="file"]').click();
	}

	_dashify(label){
		let str = label.replace(' ','-');
		return str.toLowerCase();
	}

	_viewLabel(label) {
		if(label.length > 0)
			return true;
		else 
			return false;
	}


}



Polymer(FileClab);