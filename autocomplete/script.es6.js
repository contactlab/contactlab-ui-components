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
			type:{
				type:String
			},
			noteType:{
				type:String
			},
			selected:{
				type:Object,
				value:{},
				observer:'_changedSelected'
			},
			valueField: {
				type: String,
				value: 'value'
			},
			labelField: {
				type: String,
				value: 'label'
			},
			placeholder:{
				type:String,
				value:'Type..'
			},
			disabled:{
				type:Boolean,
				value:false
			},
			options:Array,
			url:String,
			results:{
				type:Array,
				value:[],
				notify:true
			},
			optionsFn: {
				type: Function,
				observer: '_setOptions'
			},
			filter:{
				type:Boolean,
				value:false
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
			inline:{
				type:Boolean,
				value:false
			},
			labelSize: {
				type: String,
				observer: '_setLabelSize'
			},
			icon:String,


			/*----------
			  PRIVATE
			----------*/
			_inputString:{
				type:String,
				readonly: true
			},
			_currentHint:Object,
			_spinner:{
				type:Boolean,
				value:false
			},
			_interval:Object
		};
	}




	/*----------
	EVENT HANDLERS
	----------*/
	_handleKeyboardInputs(evt){
		// If Enter
		if(evt.keyCode==13 && this._currentHint!=undefined){
			// this.setSelected(this._currentHint);
			this.set('selected', this._currentHint);
			this.querySelector('input-clab input').blur();
			this.results=[];
			return;
		}

		//If Arrows
		if(this.results.length>0 && evt.keyCode==38 && this._currentHint!=undefined){
			evt.preventDefault();
			this._handleArrows('up');
			return;
		}
		if(this.results.length>0 && evt.keyCode==40 && this._currentHint!=undefined){
			evt.preventDefault();
			this._handleArrows('down');
			return;
		}

		// If typing
		if(this._inputString.length>this.minChar){
			this.fire('typing');
			if(typeof this._interval == 'number'){
				window.clearTimeout(this._interval);
				this._interval=undefined;
			}

			if(this.url!=undefined){
				this._interval=window.setTimeout(()=>{
					this._fetchOptions();
				},400);

			} else {
				this._showHints(true);
			}

		} else {
			this.querySelector('curtain-clab').open=false;
		}
	}

	_handleHighlight(evt){
		this._currentHint=this.results[evt.detail.index];
	}

	handleSelect(evt){
		// this.setSelected(this.results[evt.detail.index]);
		this.set('selected', this.results[evt.detail.index]);
	}

	_handleBlur(evt){
		if(this.dontHide){
			evt.preventDefault();
			return;
		}

		this.querySelector('curtain-clab').open=false;
		if(this.selected==undefined || this.selected[this.labelField]!=this._inputString){
			this._inputString='';
			this._currentHint=undefined;
		}
	}



	/*----------
	METHODS
	----------*/
	_fetchOptions(){
		window.clearTimeout(this._interval);
		this._interval=undefined;
		this._startSpinnerTimeout();

		fetch(this.url, {
			method: 'GET'
		}).then(res=>{
			if (res.status !== 200) {
				console.log('Looks like there was a problem. Status Code: '+res.status);
				this.type='error';
				this._resetSpinnerTimeout();
				return;
			}

			res.json().then((data)=>{
				this.set('options',data);
				if(this.type==='error') this.type='';
				this.async(()=>{
					this._showHints(this.filter);
					this._resetSpinnerTimeout();
				},50);
			});

		}).catch(err=>{
			console.error("Fetch Error ==> ", err);
			this.type='error';
			this._resetSpinnerTimeout();
		});
	}

	_showHints(filter){
		let searchVal=this._inputString.toLowerCase();
		if(!filter){ this.set('results', this.options); }
			else {
				let results=[];
				this.options.map((opt, i)=>{
					if(opt[this.labelField].toLowerCase().search(searchVal)>-1) results.push(this.options[i]);
				});
				this.set('results', results);
			}

		// handle list visual
		if(this.results.length>0){
			this._currentHint=this.results[0];
			this.querySelector('curtain-clab').open=true;
		} else {
			this.querySelector('curtain-clab').open=false;
			this._currentHint=undefined;
			console.info('No hint was found');
		}
	}

	_handleArrows(type){
		let HIdx=this._getIndex(this._currentHint, this.results);
		let item;
		switch(type){
			case 'up':
				item=this.results[HIdx-1];
				if(typeof item == 'object'){
					this._currentHint=item;
					this.querySelector('curtain-clab').scrollToHighlight(HIdx-1, true);
				}
				break;
			case 'down':
				item=this.results[HIdx+1];
				if(typeof item == 'object'){
					this._currentHint=item;
					this.querySelector('curtain-clab').scrollToHighlight(HIdx+1, false);
				}
				break;
		}
	}




	/*----------
	OBSERVERS
	----------*/
	_setOptions(promise){
		promise().then((resp) => {
			this.set('options', resp);
		});
	}

	_changedSelected(val, old){
		if(val!=undefined && Object.keys(val).length>0){
			this._inputString=this.selected[this.labelField];
			this._currentHint=undefined;

			if(this.resultAsObj) this.fire('change', {'selected':this.selected, 'value':this.selected});
				else this.fire('change', {'selected':this.selected.label, 'value':this.selected.label});
		}
	}




	/*----------
	UTILS
	----------*/
	_startSpinnerTimeout(){
		this._interval=window.setTimeout(()=>{
			if(!this._spinner) this._spinner=true;
		},400);
	}

	_resetSpinnerTimeout(){
		window.clearTimeout(this._interval);
		this._interval=undefined;
		if(this._spinner) this._spinner=false;
	}

	_setLabelSize(newSize){
		this.set("labelSize", newSize)
	}



	/*----------
	PUBLIC
	----------*/
	setSelected(obj){
		this.set('selected', obj);
		// this._inputString=this.selected[this.labelField];
		// this._currentHint=undefined;
		//
		// if(this.resultAsObj) this.fire('change', {'selected':this.selected});
		// 	else this.fire('change', {'selected':this._inputString});
	}


}



Polymer(AutoCompleteClab);
