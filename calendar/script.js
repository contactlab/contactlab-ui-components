Polymer({
	is: 'calendar-clab',
	properties: {
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
	},
	_createInstance: function(selector){
		rome(this.querySelector(selector), this.options)
			.on('data', this._changeDate.bind(this));
	},
	_changeDate: function(evt){
		this.fire('datechange', {date: evt});
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