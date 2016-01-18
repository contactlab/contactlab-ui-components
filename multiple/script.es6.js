class MultipleClab {

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "multiple-clab";
		this.properties = {
			label:{
				type: String,
				value: null
			},
			type:{
				type: String,
				value: ''
			},
			options:{
				type: Array,
				value: []
			},
			optionsFn: {
				type: Function,
				observer: '_setOptions'
			},
			url:{
				type:String
			},
			selected:{
				type:Array,
				value:[],
				notify:true
			},
			name: {
				type: String,
				value: 'multiple select'
			},
			disabled: {
				type:Boolean,
				value:false,
				observer:'_disabledChanged'
			},
			maxInView:{
				type:Number,
				value:6
			},
			spinner:{
				type:Boolean,
				value:false
			},
			noteType: {
				type: String
			},

			compNoteType: {
				type: String,
				computed: '_computeNoteType(type, noteType)'
			}
		}
	}

	attached(){
		// Fetch options
		if(this.url!=undefined){
			let timeoutID=window.setTimeout(()=>{
				this.spinner=true;
			},400);

			fetch(this.url, {
				method: 'GET'
			}).then(res=>{
				if (res.status !== 200) {  
					console.log('Looks like there was a problem. Status Code: '+res.status);

					window.clearTimeout(timeoutID);
					timeoutID=undefined;
					if(this.spinner) this.spinner=false;
					return;
				}
				res.json().then((data)=>{
					this.set('options',data);
					window.clearTimeout(timeoutID);
					timeoutID=undefined;
					if(this.spinner) this.spinner=false;

					this.async(()=>{
						this._setWrapperHeights();
					},100);
				});
			}).catch(err=>{
				console.error("Fetch Error ==> ", err);
				
				this.type='error';
				window.clearTimeout(timeoutID);
				timeoutID=undefined;
				if(this.spinner) this.spinner=false;
			});
		} else {
			this.async(()=>{
				this._setWrapperHeights();
			},100);
		}

		// Global vars
		this.lastSelected=undefined;
		this.shift=false;
		this.ctrl=false;

		// Listen for key events
		document.querySelector('body').addEventListener('keydown', this._handleKeys.bind(this));
		document.querySelector('body').addEventListener('keyup', this._handleKeys.bind(this));
	}





	/*---------- 
	EVENT HANDLERS	
	----------*/
	_handleSelection(evt){
		if(this.disabled) return;

		if(!this.shift && !this.ctrl){
			// starting the select
			this.set('selected', []);
			Array.prototype.map.call(this.querySelectorAll('.options-list li'), el=>{
				el.classList.remove('selected');
			});
			this._selectThis(evt.target);

		} else if(this.ctrl){
			//adding or removing single select
			if(evt.target.classList.contains('selected')) 
				this._removeThis(evt.target);
			else {
				this._selectThis(evt.target);
			}

		} else if(this.shift){
			//adding multiple select
			if(this.lastSelected != undefined) this._selectThese(evt.target.getAttribute('data-index'));

		}
	}

	_handleKeys(evt){
		if(this.disabled) return;
		
		if(evt.type=='keydown' && evt.keyCode==16){
			this.shift=true;
		}
		else if(evt.type=='keydown' && evt.keyCode==17){
			this.ctrl=true;
		}
		else if(evt.type=='keyup'){
			this.shift=false;
			this.ctrl=false;
		}
	}

	_loadContent(evt){
		if(this.disabled) return;

		let maxScrollable=evt.target.scrollHeight-evt.target.clientHeight;
		if(evt.target.scrollTop==maxScrollable){
			evt.preventDefault();

			if(this.url!=undefined){
				//load more content
				let timeoutID=window.setTimeout(()=>{
					this.spinner=true;
				},400);

				fetch(this.url, {
					method: 'GET'
				}).then(res=>{
					if (res.status !== 200) {  
						console.log('Looks like there was a problem. Status Code: '+res.status);
						if(typeof timeoutID == 'number'){
							window.clearTimeout(timeoutID);
							timeoutID=undefined;
							this.spinner=false;
						}
						return;
					}
					res.json().then((data)=>{
						let newData=this.options.concat(data);
						this.set('options',newData);

						if(typeof timeoutID == 'number'){
							window.clearTimeout(timeoutID);
							timeoutID=undefined;
							this.spinner=false;
						}
					});
				});
			}
		}
	}





	/*---------- 
	METHODS		
	----------*/
	_selectThis(elem){
		let i=elem.getAttribute('data-index');
		elem.classList.add('selected');
		this.push('selected', this.options[i]);
		this.fire('change', {selected:this.selected});
		this.lastSelected=i;
	}

	_removeThis(elem){
		let i=elem.getAttribute('data-index');
		console.log(i);
		elem.classList.remove('selected');
		this.splice('selected', i, 1);
		this.fire('change', {selected:this.selected});
		this.lastSelected=undefined;
	}

	_selectThese(lastClicked){
		let arr=[],
			first,
			last;
		if(this.lastSelected>lastClicked){
			first=lastClicked;
			last=this.lastSelected;
		} else {
			first=this.lastSelected;
			last=lastClicked;
		}

		for(var i=first; i<=last; i++){
			arr.push(i);
			if(this.selected.indexOf(this.options[i])==-1) this.push('selected', this.options[i]);
		}

		this._highlightElems(arr);
		this.fire('change', {selected:this.selected});
	}

	_highlightElems(idx){
		this.async(()=>{
			idx.map(i=>{
				Array.prototype.map.call(this.querySelectorAll('.options-list li'), el=>{
					if(el.getAttribute('data-index')==i){
						el.classList.add('selected');
					}
				});
			});
		},100);
	}




	/*---------- 
	OBSERVERS
	----------*/
	_setOptions(promise){
		promise().then((resp) => {
			this.set('options', resp);
		});
	}

	_disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}





	/*---------- 
	COMPUTED	
	----------*/
	_compWrapperType(type){
		let arr = ['multiple-wrapper'];
		if(type) arr.push(type);
		return arr.join(' ');
	}

	_computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}






	/*---------- 
	UTILITIES	
	----------*/
	_setWrapperHeights(){
		if(this.liHeight==undefined) this.liHeight=this.querySelectorAll('.options-list li')[0].clientHeight;
		this.querySelector('.options-list').style.maxHeight=(this.liHeight*this.maxInView)+'px';
	}


}


Polymer(MultipleClab);