class CalendarClab{

	beforeRegister(){
		this.is = "calendar-clab";
		this.properties = {
			/**
	       * Add a label to the calendar input
	       */
			label: {
				type: String
			},
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
			placeholder: {
				type: String
			},
			type: {
				type: String,
				value: ""
			},
			noteType: {
				type: String,
				value: ''
			},
			compNoteType: {
				type: String,
				computed: '_computeNoteType(type, noteType)'
			}
		}
	}

	attached(){
		setTimeout(() => {
			this.inline ? this._createInstance('div.inline-cal') : this._createInstance("input");
		},50 );
	}

	_checkClear(evt){
		this.valueStr == "" ? this.clear() : null;
	}

	_focusElement(evt){
		if(!this.disabled){
			evt.stopPropagation();
			this.getRomeInstance().show();
		}
	}

	_createInstance(selector){
		let obj;
		typeof this.options == 'object' ? obj = this.options : obj = this.getRomeInstance().options();
		rome(this.$$(selector), obj)
			.on('data', this._changeDate.bind(this));
	}

	_getFormat(){
		let thisFormat; 
		this.options.inputFormat ? thisFormat = this.options.inputFormat : thisFormat = this.getRomeInstance().options().inputFormat;
		return thisFormat;
	}

	_changeDate(evt){
		this.valueStr = evt;
		this.fire('datechange', { date: evt, dateISO: moment(evt).format() });
	}

	_computeType(type){
		return ['calendar',type].join(' ');
	}

	_computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}

	_dashify(label){
		return label.toLowerCase().replace(' ', '-');
	}

	_viewLabel(label){
		if(label.length > 0){
			return true; 
		} else {
			return false;
		}
	}

	/* PUBLIC METHODS */
	setValue(userValue){
		this.valueStr = moment(userValue).format(this._getFormat());
	}

	getValue(){
		let formatted = moment(this.valueStr, this._getFormat()).format();
		return formatted;
	}

	getRomeInstance(){
		return rome.find(this.$$('input'));
	}

	clear(){
		this.value = '';
		this.valueStr = null;
		let rome  = this.getRomeInstance();
		rome.setValue(moment().format());
	}

}


Polymer(CalendarClab);