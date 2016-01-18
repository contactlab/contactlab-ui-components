class AutoCompleteClab{

	get behaviors() {
      return [UtilBehavior];
    }

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
			placeholder:{
				type:String,
				value:'Type..'
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
			minChar:{
				type:Number,
				value:3
			},
			maxInView:{
				type:Number,
				value:6
			},
			inputType:{
				type:String,
				value:''
			},
			noteType:{
				type:String
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

	attached(){
		this.list=this.querySelector('.options-list');
		this.results=[];
		this.currentHint=undefined;
		this.spinner=false;
		this.interval;

		if(this.value!=undefined){ this._setValue(this.value, true); }

		this.querySelector('input-clab input').addEventListener('blur',this._handleBlur.bind(this));
		this.addEventListener('mousedown', this._handleClick);
		this.addEventListener('mouseup', (evt)=>{ this.dontHide=false; });
	}




	/*---------- 
	EVENT HANDLERS
	----------*/
	_handleKeyboardInputs(evt){
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
			this.fire('typing');
			if(typeof this.interval == 'number'){
				window.clearTimeout(this.interval);
				this.interval=undefined;
			}

			if(this.url!=undefined){
				this.interval=window.setTimeout(()=>{
					this._fetchOptions();
				},400);
				
			} else {
				this._handleHints(false);
			}
			
		} else {
			this._closeList();
		}
	}

	_handleBlur(evt){
		if(this.dontHide){
			evt.preventDefault();
			return;
		}

		this._closeList();
		if(this.value==undefined || this.value.label!=this.inputString){
			this.inputString='';
			this.currentHint=undefined;
		}
	}

	_handleClick(evt){
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

	_highlightThis(evt){
		let i=evt.target.getAttribute('data-index');
		this._highlightEl(i);
		this.currentHint=this.options[i];
	}




	/*---------- 
	FUNCTIONS
	----------*/
	_fetchOptions(){
		window.clearTimeout(this.interval);
		this.interval=undefined;
		this._startSpinnerTimeout();

		fetch(this.url, {
			method: 'GET'
		}).then(res=>{
			if (res.status !== 200) {  
				console.log('Looks like there was a problem. Status Code: '+res.status);  
				this.inputType='error';
				this._resetSpinnerTimeout();
				return;
			}

			res.json().then((data)=>{
				this.set('options',data);
				this.async(()=>{
					this._handleHints(true);
					this._resetSpinnerTimeout();
				},50);
			});

		}).catch(err=>{
			console.error("Fetch Error ==> ", err);
			this.inputType='error';
			this._resetSpinnerTimeout();
		});
	}

	_handleHints(fetched){
		let searchVal=this.inputString.toLowerCase();

		if(fetched){
			this.results=this.options;
			Array.prototype.map.call(this.list.children, (el)=>{
				el.classList.add('show');
			});

		} else {
			this.results=[];

			this.options.map((opt, i)=>{
				if(opt.label.toLowerCase().search(searchVal)>-1){
					//if(!this.spinner && (new Date().getTime())-start > 400) this.spinner=true;
					this.querySelectorAll('.options-list li')[i].classList.add('show');
					this.results.push(this.options[i]);

				} else {
					//if(!this.spinner && (new Date().getTime())-start > 400) this.spinner=true;
					this.querySelectorAll('.options-list li')[i].classList.remove('show');
				}
			});
		}

		this._handleListVisual(searchVal);
	}

	_handleListVisual(searchVal){
		if(this.results.length>0){
			if(!this.hideHints){
				this.async(()=>{
					this._setListHeight(this.results.length);
				},100);
			}
			this._highlightEl(this._getMoreAccurateIdxMatch(this.results, searchVal));
			//this.fire('sendRes',this.results);

		} else {
			this._closeList();
			this.currentHint=undefined;
			console.info('No hint was found');
		}
	}

	_setValue(obj){
		this.set('value', obj);
		this.inputString=this.value.label;
		this.currentHint=undefined;

		if(this.resultAsObj)
			this.fire('change', {'selected':this.value});
		else
			this.fire('change', {'selected':this.inputString});
	}

	_closeList(){
		this.list.scrollTop=0;
		this.list.classList.remove('active');
		Array.prototype.map.call(this.querySelectorAll('.options-list li') ,el=>{
			el.classList.remove('selected');
		});
	}

	_highlightEl(idx){
		this.async(()=>{
			Array.prototype.map.call(this.querySelectorAll('.options-list li'), el=>{
				if(el.getAttribute('data-index')==idx){
					el.classList.add('selected');
				} else {
					el.classList.remove('selected');
				}
			});
		},100);
	}

	_getMoreAccurateIdxMatch(res, search){
		let isSame=false;
		let idx;
		res.map((item,i)=>{
			if(item.label===search){
				isSame=true;
				idx = this._getIndex(item, this.options);
				this.currentHint=item;
			}
		});
		if(!isSame){
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
				this._scrollToHighlight(toSel, this._getIndex(toSel, this.options), true);
			} else { return; }
			
		} else if(type==='down'){ 
			toSel=this.results[HIdx+1]; 
			if(typeof toSel == 'object'){
				this._scrollToHighlight(toSel, this._getIndex(toSel, this.options), false);
			} else { return; }
		}
	}

	_scrollToHighlight(item, i, goesUp){
		this.currentHint=item;
		this._highlightEl(i);
		let visible=this._isElemVisible(i);
		if(!visible && !goesUp)
			this.list.scrollTop+=this.list.clientHeight;
		else if(!visible && goesUp)
			this.list.scrollTop-=this.list.clientHeight;
	}




	/*---------- 
	OBSERVERS
	----------*/
	_setOptions(promise){
		promise().then((resp) => {
			this.set('options', resp);
		});
	}




	/*---------- 
	UTILS
	----------*/
	_setListHeight(elemsShown){
		if(this.liHeight===null) {
			this.list.classList.add('hidden');
			this.liHeight = this.querySelectorAll('.options-list li.show')[0].clientHeight;
			console.log(this.querySelectorAll('.options-list li.show')[0].clientHeight);
			this.list.style.maxHeight=(this.liHeight*this.maxInView)+'px';
			this.list.classList.remove('hidden');
		}
		this.list.style.height=(this.liHeight*elemsShown)+'px';
		this.list.scrollTop=0;
		if(!this.list.classList.contains('active')) this.list.classList.add('active');
	}

	_isElemVisible(i){
		let offsetTop=this.list.children[i].offsetTop,
			scrollTop=this.list.scrollTop,
			h=this.list.clientHeight;
		if(offsetTop<scrollTop || offsetTop>=(scrollTop+h)) return false; else return true;
	}

	_startSpinnerTimeout(){
		this.interval=window.setTimeout(()=>{
			if(!this.spinner) this.spinner=true;
		},400);
	}

	_resetSpinnerTimeout(){
		window.clearTimeout(this.interval);
		this.interval=undefined;
		if(this.spinner) this.spinner=false;
	}

	
}



Polymer(AutoCompleteClab);