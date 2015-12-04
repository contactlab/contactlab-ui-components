class FileClab{

	beforeRegister(){
		this.is = "file-clab";
		this.properties = {
			label: {
				type: String,
			},
			name: {
				type: String,
				value: 'fileinput'
			},
			type: {
				type: String,
				value: ''
			},
			value: {
				type: String,
				value: null
			},
			disabled: {
				type: Boolean,
				value: false,
				notify: true,
				reflectToAttribute: true,
				observer: 'disabledChanged'
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
			textInput.value = arr.join(', ').replace("C:\\fakepath\\", "");
			this.value = textInput.value;
		});
	}

	disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}

	computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}


	_selection(evt){
		this.$$('input[type=file]').click();
	}

	_dashify(label){
		return label.toLowerCase().replace(' ','-');
	}

	_viewLabel(label) {
		if(label.length > 0)
			return true;
		else 
			return false;
	}


}



Polymer(FileClab);