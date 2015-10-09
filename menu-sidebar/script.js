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
		},
		menu: {
			type: Array,
			value: []
		}
	},
	attached: function(){
		setTimeout(function(){
			$('menu-clab .first-level-menu>li>a').each(function(i, e){					
				if(location.hash.search(e.getAttribute('href')) > -1){
					e.parentNode.classList.add('active');
				}else{
					e.parentNode.classList.remove('active');
				}
			});
		},10)
	},
	_activeItem: function(evt){
		$('menu-clab li').removeClass('active');
		evt.currentTarget.parentNode.classList.add('active');
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