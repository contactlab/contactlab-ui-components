class CalendarClab{

	beforeRegister(){
		this.is = "calendar-clab";
		this.properties = {
			label: {
				type: String
			},
			disable: {
				type: Boolean,
				value: false
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
			}
		}
	}

	attached(){
		setTimeout(() => {
			this.inline ? this._createInstance('div.inline-cal') : this._createInstance("input");
		},50 );
	}

	_checkClear(evt){
		this.querySelector('input').value == "" ? this.clear() : null;
	}

	_focusElement(evt){
		setTimeout(() => {
			this.getRomeInstance().show();
		},50);
	}

	_createInstance(selector){
		let obj;
		typeof this.options == 'object' ? obj = this.options : obj = this.getRomeInstance().options();
		rome(this.querySelector(selector), obj)
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
		var arr = ['input-wrapper', 'calendar'];
		arr.push(type);
		return arr.join(' ');
	}

	_dashify(label){
		var str = label.replace(' ', '-');
		return str.toLowerCase();
	}

	_viewLabel(label){
		if(label.length > 0)
			return true; 
		else
			return false;
	}

	setValue(userValue){
		this.querySelector('input').value = moment(userValue).format(this._getFormat());
	}

	getValue(){
		let elem = this.querySelector('input').value;
		let formatted = moment(elem, this._getFormat()).format();
		return formatted;
	}

	getRomeInstance(){
		return rome.find(this.querySelector('input'));
	}

	clear(){
		this.value = '';
		this.querySelector('input').value = '';
		let rome  = this.getRomeInstance();
		rome.setValue(moment().format());
	}

}


Polymer(CalendarClab);