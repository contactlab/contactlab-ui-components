Polymer({
	is: 'progress-clab',
	properties:{
		value: {
			type: Number,
			value: 0
		},
		minimal: {
			type: Boolean,
			value: false
		},
		primary: {
			type: Boolean,
			value: false
		},
		secondary: {
			type: Boolean,
			value: false
		},
		info: {
			type: Boolean,
			value: false
		},
		success: {
			type: Boolean,
			value: false
		},
		warning: {
			type: Boolean,
			value: false
		},
		error: {
			type: Boolean,
			value: false
		}
	},
	computeProp: function(value){
		return 'width:' + this.value + '%;';
	},
	computeClass: function(minimal,color){
		var vals = ['minimal','primary','secondary','info','success','warning','error'];
		var classes = ['progress-bar'];
		for(var i = 0; i < arguments.length; i++){
			arguments[i] ? classes.push(vals[i]) : null;
		}
		return classes.join(' ');
	},
	percent: function(value){
		return value + '%'
	}
});