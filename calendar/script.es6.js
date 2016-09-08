class CalendarClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "calendar-clab";
		this.properties = {
			label: String,
			disabled: {
				type: Boolean,
				value: false
			},
			valueStr: {
				type: String,
				value: null,
				notify: true
			},
			inline: {
				type: Boolean,
				value: false
			},
			options: {
				type: Object,
				value: {}
			},
			placeholder: String,
			type: String,
			noteType: String
		}
	}

	attached(){
		setTimeout(() => {
			this.inline ? this._createInstance('div.inline-cal') : this._createInstance("input");
		},50 );
	}




	/*----------
	EVENT HANDLERS
	----------*/
	_checkClear(evt){
		if(evt.target.value == "" ){
			this.clear();
			this.fire('datechange', { date: undefined, dateISO: undefined });
		}

	}

	_focusElement(evt){
		if(!this.disabled){
			evt.stopPropagation();
			console.log(this.getRomeInstance());
			this.getRomeInstance().show();
		}
	}



	/*----------
	METHODS
	----------*/
	_createInstance(selector){
		let obj = typeof this.options == 'object' ? this.options : this.getRomeInstance().options();
		rome(this.$$(selector), obj)
			.on('data', this._changeDate.bind(this));
	}

	_changeDate(evt){
		this.valueStr = evt;
		this.fire('datechange', { date: evt, dateISO: moment(new Date(evt)).format() });
	}



	/*----------
	COMPUTED
	----------*/
	_computeType(str, type){
		return [str,type].join(' ');
	}




	/*----------
	UTILS
	----------*/
	_getFormat(){
		let thisFormat = this.options.inputFormat ? this.options.inputFormat : this.getRomeInstance().options().inputFormat;
		return thisFormat;
	}





	/*----------
	PUBLIC METHODS
	----------*/
	setValue(userValue){
		this.valueStr = moment(userValue).format(this._getFormat());
	}

	getValue(){
		let formatted = moment(this.valueStr, this._getFormat()).format();
		return this.valueStr? formatted : undefined;
	}

	getRomeInstance(){
		return rome.find(this.querySelector('input'));
	}

	clear(){
		this.value = '';
		this.valueStr = null;
		let rome  = this.getRomeInstance();
		rome.setValue(moment().format());
	}

}


Polymer(CalendarClab);
