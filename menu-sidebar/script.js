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
		this._iosMenu();

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
	_openItem: function(evt){
		$('menu-clab .first-level-menu>li>a').each(function(i, e){					
			if(location.hash.search(e.getAttribute('href')) > -1){
				e.parentNode.classList.add('active');
			}else{
				e.parentNode.classList.remove('active');
			}
		});
		$('menu-clab .first-level-menu>li').each(function(i, e){					
			e.classList.remove('open');
		});
		if(evt.currentTarget.nextElementSibling.tagName === 'UL'){
			evt.preventDefault();
			evt.currentTarget.parentNode.classList.add('open');
			$('menu-clab .first-level-menu>li>a').each(function(i,e){
				e.parentNode.classList.remove('active');
			});
			evt.currentTarget.parentNode.classList.add('active');
		}
	},
	_iosMenu: function(){
		$('body main').on('click', function(evt){
			console.log(evt.target.nodeName);
			switch(evt.target.nodeName){
				case 'INPUT':
				case 'BUTTON':
				case 'TEXTAREA':
				case 'LABEL':
					return true;
					break;
				default:
					document.querySelector('#logo a').focus();
					$('menu-clab .first-level-menu>li').each(function(i,e){
						e.classList.remove('open');
					});
					break;
			}
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