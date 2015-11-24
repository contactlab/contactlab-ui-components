class CalendarClab{

	beforeRegister(){
		this.is = "calendar-clab";
		this.properties = {
			label: {
				type: String
			},
			value: {
				type: String,
				reflectToAttribute: true
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
				value: {}
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

	_focusElement(){
		this.querySelector('input').focus();
	}

	_createInstance(selector){
		rome(this.querySelector(selector), this.options)
			.on('data', this._changeDate.bind(this));
	}

	_changeDate(evt){
		this.value = moment(evt).format();
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