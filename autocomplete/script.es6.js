class AutoCompleteClab{

	beforeRegister(){
		this.is = "autocomplete-clab";
		this.properties = {
			label:{
				type:String,
				value:null
			},
			name:{
				type:String,
				value:'auto complete'
			},
			value:{
				type:Object
			},
			disabled:{
				type:Boolean,
				value:false
			},
			options:{
				type: Array
			},
			url:{
				type:String
			},
			results:{
				type:Array,
				notify:true
			},
			optionsFn: {
				type: Function,
				observer: '_setOptions'
			},
			hideHints:{
				type:Boolean,
				value:false
			},
			resultAsObj:{
				type:Boolean,
				value:false
			},
			// Min amount of characters to start searching for hints
			minChar:{
				type:Number,
				value:3
			},
			// How many LIs are visible without scrolling (=> sets max-height of OL)
			maxInView:{
				type:Number,
				value:2
			},


			/*---------- 
			  PRIVATE
			----------*/
			inputString:{
				type:String,
				readonly: true
			},
			liHeight:{
				type:String,
				value:null,
				readonly: true
			}
		};
	}

	// http://jsonplaceholder.typicode.com/todos

	attached(){
		this.list=this.querySelector('.options-list');
		this.results=[];
		this.currentHint=undefined;

		/*if(this.options!=undefined){
			this.options.forEach((opt,i)=>{
				opt.show=false;
			});
		}*/
		if(this.value!=undefined){ this._setValue(this.value, true); }

		this.querySelector('input-clab input').addEventListener('blur',this._handleBlur.bind(this));
		this.addEventListener('mousedown', this._handleClick);
		this.addEventListener('mouseup', (evt)=>{ this.dontHide=false; });
	}




	/*---------- 
	EVENT HANDLERS
	----------*/
	_handleHints(evt){
		// If Enter
		if(evt.keyCode==13 && this.currentHint!=undefined){
			let i=this._getIndex(this.currentHint, this.options);
			this._setValue(this.options[i]);
			this.querySelector('input-clab input').blur();
			this.results=[];
			return;
		}

		//If Arrows
		if(this.results.length>0 && evt.keyCode==38 && this.currentHint!=undefined){
			evt.preventDefault(); 
			this._handleArrows('up'); 
			return; 
		}
		if(this.results.length>0 && evt.keyCode==40 && this.currentHint!=undefined){
			evt.preventDefault(); 
			this._handleArrows('down'); 
			return; 
		}

		// If typing
		if(this.inputString.length>this.minChar){

			if(this.url!=undefined && this.options==undefined){
				fetch(this.url).then(res=>{
					return res.json();
				}).then(obj=>{
					this.set('options',obj);
					//console.log(this.options);
					this._searchForHints();
				});
			} else {
				this._searchForHints();
			}
			
		} else {
			if(this.list.classList.contains('active')) this.list.classList.remove('active');
		}
	}

	_searchForHints(){
		let search=this.inputString;
		this.results=[];

		this.options.forEach((opt, i)=>{
			if(opt.label.search(search)>-1){
				//this.set('options.'+i+'.show', true);
				this.querySelectorAll('.options-list li')[i].classList.add('show');
				this.results.push(this.options[i]);
			} else {
				//this.set('options.'+i+'.show', false);
				this.querySelectorAll('.options-list li')[i].classList.remove('show');
			}
		});

		if(this.results.length>0){
			if(!this.hideHints){
				this.async(()=>{
					this._setListHeight(this.results.length);
				},100);
			}
			this._highlightEl(this._getIdxForHighlight(this.results, search));
			//this.fire('sendRes',this.results);

		} else {
			if(this.list.classList.contains('active')) this.list.classList.remove('active');
			this.currentHint=undefined;
		}
	}

	_handleBlur(evt){
		if(this.dontHide){
			evt.preventDefault();
			return;

		}
		if(evt){
			this._closeList();
			if(this.value==undefined || this.value.label!=this.inputString){
				this.inputString='';
			}
		}
	}

	_handleClick(evt){
		//console.log(evt.target);
		if(evt.target.localName=='ol'){
			this.dontHide=true;

		} else if(evt.target.localName=='li'){
			this.dontHide=false;
			let i=evt.target.getAttribute('data-index');
			this._setValue(this.options[i]);

		} else {
			this.dontHide=false;
		}
	}




	/*---------- 
	FUNCTIONS
	----------*/
	_setValue(obj){
		this.set('value', obj);
		this.inputString=this.value.label;
		this.currentHint=undefined;

		if(this.resultAsObj)
			this.fire('change', this.value);
		else
			this.fire('change', {'value':this.inputString});
	}

	_highlightEl(idx){
		let i = idx;
		this.async(()=>{
			Array.from(this.querySelectorAll('.options-list li')).forEach(el=>{
				if(el.getAttribute('data-index')==i){
					el.classList.add('selected');
				} else {
					el.classList.remove('selected');
				}
			});
		},100);
	}

	_getIdxForHighlight(res, search){
		let exists=false;
		let idx;
		res.forEach((item,i)=>{
			if(item.label===search){
				exists=true;
				idx = this._getIndex(item, this.options);
				this.currentHint=item;
			}
		});
		if(!exists){
			idx = this._getIndex(res[0], this.options);
			this.currentHint=res[0];
		}
		return idx;
	}

	_handleArrows(type){
		let HIdx=this._getIndex(this.currentHint, this.results);
		let toSel;

		if(type==='up'){
			toSel=this.results[HIdx-1];
			if(typeof toSel == 'object'){
				this.currentHint=toSel;
				this._highlightEl(this._getIndex(toSel, this.options));
				this.querySelector('.options-list').scrollTop-=this.liHeight;

			} else { return; }
			
		} else if(type==='down'){ 
			toSel=this.results[HIdx+1]; 
			if(typeof toSel == 'object'){
				this.currentHint=toSel;
				this._highlightEl(this._getIndex(toSel, this.options));
				this.querySelector('.options-list').scrollTop+=this.liHeight;

			} else { return; }
		}
	}

	_closeList(){
		this.list.classList.remove('active');
		Array.from(this.querySelectorAll('.options-list li')).forEach(el=>{
			el.classList.remove('selected');
		});
	}

	_fetchJSON(url){
		fetch(url).then(res=>{
			return res.json();
		}).then(obj=>{
			this.set('options',obj);
		});
	}




	/*---------- 
	OBSERVERS
	----------*/
	_setOptions(promise){
		promise().then((resp) => {
			this.options = resp;
			//this.liHeight = this.$.list.children[0].clientHeight;
		});
	}




	/*---------- 
	UTILS
	----------*/
	_getHeight(el){
		return el.clientHeight;
	}

	_getIndex(item, items){
		return items.indexOf(item);
	}

	_setListHeight(elemsShown){
		if(this.liHeight===null) {
			this.list.classList.add('hidden');
			this.liHeight = this._getHeight(this.querySelectorAll('.options-list li')[0]);
			this.list.style.maxHeight=(this.liHeight*this.maxInView)+'px';
			this.list.classList.remove('hidden');
		}
		console.log(this.liHeight);
		this.list.style.height=(this.liHeight*elemsShown)+'px';
		this.list.classList.add('active');
	}

	_dashify(str){
		return str.replace(/ /g,'-');
	}

	_viewLabel(label) {
		if(label.length>0) return true; else return false;
	}

	
}



Polymer(AutoCompleteClab);