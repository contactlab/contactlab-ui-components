Polymer({
	is: 'calendar-clab',
	properties: {
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
			type: String,
		},
		type: {
			type: String,
			value: ''
		}
	},
	attached: function(){		
		setTimeout(function(){
			this.inline ? this._createInstance('div.inline-cal') : this._createInstance('input') ;
		}.bind(this),100);

		console.log(this.querySelector('template'));
		this.querySelector('template').addEventListener('dom-change', function(evt) {
			console.log('yo');
		});
	},
	_createInstance: function(selector){
		rome(this.querySelector(selector), this.options)
			.on('data', this._changeDate.bind(this));
	},
	_changeDate: function(evt){
		this.value = moment(evt).format();
		this.fire('datechange', {date: evt , dateISO: moment(evt).format() });
	},
	_computeType: function(type){
		var arr = ['input-wrapper','calendar'];
		arr.push(type);
		return arr.join(' ');
	},
	_dashify: function(label){
		var str = label.replace(' ','-');
		return str.toLowerCase();
	},
	_viewLabel: function(label) {
		if(label.length > 0){
			return true;
		} else {
			return false;
		}
	},
	getRomeInstance: function(){
		return rome.find(this.querySelector('input'));
	}
});