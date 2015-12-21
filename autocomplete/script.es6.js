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
				type: Array,
				value: [
					{value: 'A', label: 'Option 1'},
					{value: 'B', label: 'Option 2'}
				]
			},
			noHints:{
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

	attached(){
		this.list=this.querySelector('.options-list');
		this.currentHint=undefined;
		this.currentRes=[];


		this.options.forEach((opt,i)=>{
			opt.show=false;
		});
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
			return;
		}

		//If Arrows
		if(this.currentRes.length>0 && evt.keyCode==38 && this.currentHint!=undefined){
			evt.preventDefault(); 
			this._handleArrows('up'); 
			return; 
		}
		if(this.currentRes.length>0 && evt.keyCode==40 && this.currentHint!=undefined){
			evt.preventDefault(); 
			this._handleArrows('down'); 
			return; 
		}

		// If typing
		if(this.inputString.length>this.minChar && !this.noHints){
			let search=this.inputString;
			this.currentRes=[];

			this.options.forEach((opt, i)=>{
				if(opt.label.search(search)>-1){
					this.set('options.'+i+'.show', true);
					this.currentRes.push(this.options[i]);
				} else {
					this.set('options.'+i+'.show', false);
				}
			});

			if(this.currentRes.length>0){
				this.async(()=>{
					this._setListHeight(this.currentRes.length);
				},100);

				this._highlightEl(this.currentRes, search);

			} else {
				this.list.style.height='0';
				this.currentHint=undefined;
			}
			
		} else {
			this.list.style.height='0';
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
	_setValue(obj, init){
		if(init){
			this.inputString=this.value.label;
			if(this.resultAsObj)
				this.fire('valueChange', {value:this.value});
			else
				this.fire('valueChange', {value:this.inputString});

			return;
		}

		this.value=obj;
		this.inputString=this.value.label;
		this.currentHint=undefined;

		if(this.resultAsObj)
			this.fire('valueChange', {value:this.value});
		else
			this.fire('valueChange', {value:this.inputString});
	}

	_highlightEl(res, search){
		let i;
		if(typeof res == 'object'){
			i=this._getIdxForHighlight(res, search);
		} else {
			i=res;
		}

		this.async(()=>{
			Array.from(this.querySelectorAll('.options-list li')).forEach(el=>{
				//console.log(el.getAttribute('data-index'),i);
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
		let HIdx=this._getIndex(this.currentHint, this.currentRes);
		let toSel;

		if(type==='up'){
			toSel=this.currentRes[HIdx-1];
			if(typeof toSel == 'object'){
				this.currentHint=toSel;
				this._highlightEl(this._getIndex(toSel, this.options));
				this.querySelector('.options-list').scrollTop-=this.liHeight;

			} else { return; }
			
		} else if(type==='down'){ 
			toSel=this.currentRes[HIdx+1]; 
			if(typeof toSel == 'object'){
				this.currentHint=toSel;
				this._highlightEl(this._getIndex(toSel, this.options));
				this.querySelector('.options-list').scrollTop+=this.liHeight;

			} else { return; }
		}
	}

	_closeList(){
		this.list.style.height='0';
		Array.from(this.querySelectorAll('.options-list li')).forEach(el=>{
			el.classList.remove('selected');
		});
	}




	/*---------- 
	COMPUTED VALUES
	----------*/




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
		if(this.liHeight===null) this.liHeight = this._getHeight(this.querySelectorAll('.options-list li')[0]);
		this.list.style.maxHeight=(this.liHeight*this.maxInView)+'px';
		this.list.style.height=(this.liHeight*elemsShown)+'px';
	}

	_dashify(str){
		return str.replace(/ /g,'-');
	}

	_viewLabel(label) {
		if(label.length>0) return true; else return false;
	}

	
}



Polymer(AutoCompleteClab);