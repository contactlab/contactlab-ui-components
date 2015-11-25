class MenuClab{

	beforeRegister(){
		this.is = 'menu-clab';
		this.properties = {
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
		}
	}

	attached(){
		this._iosMenu();

		setTimeout(() => {
			_.forEach(document.querySelectorAll('menu-clab .first-level-menu>li>a'), (e,i ) => {				
				if(location.hash.search(e.getAttribute('href')) > -1){
					e.parentNode.classList.add('active');
				}else{
					e.parentNode.classList.remove('active');
				}
			});

			_.forEach(document.querySelectorAll('menu-clab .second-level-menu>li>a'), (e,i ) => {				
				if(location.hash.search(e.getAttribute('href')) > -1){
					e.parentNode.classList.add('active');
				}else{
					e.parentNode.classList.remove('active');
				}
			});
		},10)
	}

	_openItem(evt){
		let selector = document.querySelectorAll('menu-clab .first-level-menu>li>a, menu-clab .second-level-menu>li>a');
		_.forEach(selector, (e,i ) => {					
			if(location.hash.search(e.getAttribute('href')) > -1){
				e.parentNode.classList.add('active');
			}else{
				e.parentNode.classList.remove('active');
			}
		});
		_.forEach(document.querySelectorAll('menu-clab .first-level-menu>li'), (e,i ) => {
			e.classList.remove('open');
		});
		if(evt.currentTarget.nextElementSibling.tagName === 'UL'){
			evt.preventDefault();
			evt.currentTarget.parentNode.classList.add('open');
			_.forEach(selector, (e,i ) => {
				e.parentNode.classList.remove('active');
			});
			evt.currentTarget.parentNode.classList.add('active');
		}
	}

	_activeItem(evt){
		let selector = document.querySelectorAll('menu-clab .second-level-menu>li>a');
		_.forEach(selector, (e,i ) => {
			e.parentNode.classList.remove('active');
		});
		evt.currentTarget.parentNode.classList.add('active')
	}

	_iosMenu(){
		document.querySelector('body main').addEventListener('click', (evt) => {
			switch(evt.target.nodeName){
				case 'INPUT':
				case 'BUTTON':
				case 'TEXTAREA':
				case 'LABEL':
				case 'SELECT':
					return true;
					break;
				default:
					document.querySelector('#logo a').focus();
					let elems = document.querySelectorAll('menu-clab .first-level-menu>li');
					_.forEach(elems, (e, i) => {
						e.classList.remove('open');
					});
					break;
			}
		});
	}

	_reduce(){
		document.body.classList.toggle('main-sidebar-small');
	}

	_computeTitleIcon(icon){
		return ['clab',icon].join(' ');
	}

	_computeReduceIcons(classes){
		return classes;
	}

}


Polymer(MenuClab);