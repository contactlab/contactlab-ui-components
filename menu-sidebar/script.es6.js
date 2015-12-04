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
			},
			link: {
				type:String,
				value: '/'
			}
		}
	}

	attached(){
		this._iosMenu();

		setTimeout(() => {
			Array.from(this.querySelectorAll('.first-level-menu>li>a')).forEach( (e,i) => {				
				if(location.hash.search(e.getAttribute('href')) > -1){
					e.parentNode.classList.add('active');
				}else{
					e.parentNode.classList.remove('active');
				}
			});


			Array.from(this.querySelectorAll('.second-level-menu>li>a')).forEach((e,i) => {				
				if(location.hash.search(e.getAttribute('href')) > -1){
					e.parentNode.classList.add('active');
				}else{
					e.parentNode.classList.remove('active');
				}
			});
		},10)
	}

	_openItem(evt){
		let selector = this.querySelectorAll('.first-level-menu>li>a, menu-clab .second-level-menu>li>a');
		Array.from(selector).forEach((e,i ) => {					
			if(location.hash.search(e.getAttribute('href')) > -1){
				e.parentNode.classList.add('active');
			}else{
				e.parentNode.classList.remove('active');
			}
		});
		Array.from(this.querySelectorAll('.first-level-menu>li')).forEach((e,i ) => {
			e.classList.remove('open');
		});
		if(evt.currentTarget.nextElementSibling.tagName === 'UL'){
			evt.preventDefault();
			evt.currentTarget.parentNode.classList.add('open');
			Array.from(selector).forEach((e,i ) => {
				e.parentNode.classList.remove('active');
			});
			evt.currentTarget.parentNode.classList.add('active');
		}
	}

	_activeItem(evt){
		Array.from(this.querySelectorAll('.second-level-menu>li>a')).forEach((e,i ) => {
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
					this.$$('#logo a').focus();
					Array.from(this.querySelectorAll('.first-level-menu>li')).forEach((e, i) => {
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