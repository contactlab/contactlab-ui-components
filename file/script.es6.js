class FileClab{

	get behaviors() {
      return [UtilBehavior];
    }

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
			Array.prototype.map.call(fileInput.files, file => {
				arr.push(file.name);
			});
			textInput.value = arr.join(', ').replace("C:\\fakepath\\", "");
			this.value = textInput.value;
		});
	}



	/*---------- 
	EVENT HANDLERS
	----------*/
	_selection(evt){
		this.$$('input[type=file]').click();
	}



	/*---------- 
	OBSERVERS
	----------*/
	disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}



	/*---------- 
	COMPUTE
	----------*/
	computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}
}



Polymer(FileClab);