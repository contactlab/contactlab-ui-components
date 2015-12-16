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
			/**
	       * Whether the input is disabled or not
	       */
			disabled: {
				type: Boolean,
				value: false,
				observer: 'disabledChanged'
			},
			inline: {
				type: Boolean,
				value: false
			},
			options: {
				type: Object,
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
				computed: 'computeNoteType(type, noteType)'
			}
		}
	}

	attached(){
		setTimeout(() => {
			this.inline ? this._createInstance('div.inline-cal') : this._createInstance("input");
		},50 );
	}

	_checkClear(evt){
		this.$$('input').value == "" ? this.clear() : null;
	}

	_focusElement(evt){
		setTimeout(() => {
			this.getRomeInstance().show();
		},50);
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
		this.fire('datechange', { date: evt, dateISO: moment(evt).format() });
	}

	_computeType(type){
		return ['calendar',type].join(' ');
	}

	computeNoteType(type, noteType){
		return [type, noteType].join(' ');
	}

	disabledChanged(newVal, oldVal){
		if(newVal) this.type='disabled';
	}

	_dashify(label){
		return label.toLowerCase().replace(' ', '-');
	}

	_viewLabel(label){
		if(label.length > 0)
			return true; 
		else
			return false;
	}

	setValue(userValue){
		this.$$('input').value = moment(userValue).format(this._getFormat());
	}

	getValue(){
		let elem = this.$$('input').value;
		let formatted = moment(elem, this._getFormat()).format();
		return formatted;
	}

	getRomeInstance(){
		return rome.find(this.$$('input'));
	}

	clear(){
		this.value = '';
		this.$$('input').value = '';
		let rome  = this.getRomeInstance();
		rome.setValue(moment().format());
	}

}


Polymer(CalendarClab);