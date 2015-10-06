Polymer({
	is: 'menu-clab',
	properties: {
		title: {
			type: String,
			value: 'Title'
		},
		titleIcon: {
			type: String,
			value: 'fa-hand-peace-o'
		},
		reduceText:{
			type: String,
			value: 'Riduci menu'
		},
		reduceOpen:{
			type: String,
			value: 'clab clab-icon-expand expand'
		},
		reduceClose:{
			type: String,
			value: 'clab clab-icon-resize compress'
		}
	},
	attached: function(){
		document.querySelector('body>main').addEventListener('click', function(){
			document.querySelector('#logo a').focus();
		});
	},
	_reduce: function(){
		document.body.classList.toggle('main-sidebar-small');
	},
	_computeTitleIcon: function(icon){
		return ['clab',icon].join(' ');
	},
	_computeReduceIcons: function(classes){
		return classes;
	}
});