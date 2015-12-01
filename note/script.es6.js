class NoteClab{

	beforeRegister(){
		this.is = "note-clab";
		this.properties = {
			text: {
				type: String
			},
			type: {
				type: String,
				value: ''
			},

			classes: {
				type: String,
				computed: 'computeClasses(type)'
			}
		}
	}

	computeClasses(type){
		let arr = ['note'];
		arr.push(type);
		return arr.join(' ');
	}
}


Polymer(NoteClab);