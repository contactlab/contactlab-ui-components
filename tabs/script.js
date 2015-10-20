Polymer({
	is: 'tabs-clab',
	properties: {
		labels: {
			type: Array,
			value: ['Tab 1', 'Tab 2']
		},
		pills: {
			type: Boolean,
			value: false
		},
		active: {
			type: Number,
			value: 0
		},
		tabs: {
			type: Array,
			value: [],
			readonly: true
		},
		tabContent: {
			type: Array
		}
	},
	attached: function(){
		this.tabContent = this.querySelectorAll('.tab-content');
		for(var i = 0; i < this.tabContent.length; i++){
			this.tabContent[i].style.display = 'none';
		}
		this.tabContent[this.active].style.display = 'block';
	},
	_computeType: function(pills){
		var arr = [];
		pills ? arr.push('pills') : arr.push('tabs');
		return arr.join(' ');
	},
	_changeTab: function(evt,index){
		evt ? evt.preventDefault() : null;
		this.active = parseInt(evt.currentTarget.parentNode.getAttribute('data-index'));
		for(var i = 0; i < this.tabContent.length; i++){
			this.tabContent[i].style.display = 'none';
		}
		this.tabContent[this.active].style.display = 'block';
	},
	_computeActive: function(active,index){
		var arr = ['tab'];
		(active === index) ? arr.push('active') : arr;
		return arr.join(' ');
	}
});