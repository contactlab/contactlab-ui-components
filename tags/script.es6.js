class TagsClab {

	beforeRegister(){
		this.is = "tags-clab";
		this.properties = {
			label:{
				type:String
			},
			name:{
				type:String,
				value:'tags input'
			},
			inputString:{
				type:String
			},
			disabled:{
				type:Boolean,
				value:false
			},
			tags:{
				type:Array,
				value:[],
				notify:true
			},
			inputType:{
				type:String,
				value:'success'
			},
			btn:{
				type:String
			},
			btnAppearence:{
				type:String
			},
			btnSize:{
				type:String
			},
			btnIcon:{
				type:String
			},
			hideInput:{
				type:Boolean,
				value:false
			}
		}
	}


	/*---------- 
	EVENT HANDLERS
	----------*/
	_handleKeyUp(evt){

		// if comma
		if(evt.keyCode===188)
			this._addTag(evt);
		
		// if enter
		if(evt.keyCode===13)
			this.querySelector('button-clab').fire('click');
		
	}

	_addTag(evt){
		let str=this.inputString.split(',')[0];
		this.push('tags', {
			label:str,
			value:str
		});
		this.inputString='';

		this.fire('change');
	}

	_removeTag(evt){
		let value=evt.target.getAttribute('value');
		let i;
		this.tags.forEach((tag, idx)=>{
			if(tag.value===value){
				i=idx;
				return;
			}
		});
		if(i!=undefined) this.splice('tags', i, 1);

		this.fire('remove');
	}


	/*---------- 
	UTILS
	----------*/
	_getIndex(item, items){
		return items.indexOf(item);
	}



	/*---------- 
	PUBLIC
	----------*/
	setTags(array){
		if(this.tags.length<0) {
			this.set('tags', array);
		} else {
			array.forEach(item=>{
				this.push('tags', item);
			});
			
		}
		this.fire('change');

		return this.tags;
	}

}


Polymer(TagsClab);