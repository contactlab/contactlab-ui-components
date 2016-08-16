class FileClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "file-clab";
		this.properties = {
			label: String,
			name: {
				type: String,
				value: 'fileinput'
			},
			type: String,
			noteType: String,
			value: {
				type: String,
				notify: true,
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
			noPreview:{
				type:Boolean,
				value:false
			}
		}
	}



	/*----------
	EVENT HANDLERS
	----------*/
	_selection(evt){
		this.querySelector('input[type=file]').click();
	}

	_updateValue(evt){
		let files=evt.target.files;
		let arr = [];

		let readFiles=(file)=>{
			if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
				arr.push(file.name);

		     	let reader = new FileReader();
		     	reader.addEventListener("loadend", ()=> {
		    		var image = new Image();
		        	image.height = 100;
		        	image.title = file.name;
		        	image.src = reader.result;
					// console.log(image);
		        	if(!this.noPreview) {
						this.$.preview.innerHTML='';
						this.$.preview.appendChild( image );
					}
		      	}, false);
		    	reader.readAsDataURL(file);
		    }
		}

		Array.prototype.map.call(files, readFiles);
		this.set('value', arr.join(', '));
	}

	_checkIfResetPreview(evt){
		if(evt.target.value=='') this.$.preview.innerHTML='';
	}



	/*----------
	OBSERVERS
	----------*/
	disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}





	/*----------
	PUBLIC
	----------*/
	resetPreview(){
		this.$.preview.innerHTML='';
	}



}



Polymer(FileClab);
