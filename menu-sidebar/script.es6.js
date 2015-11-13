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
			let firstLevelA = Array.from($('menu-clab .first-level-menu>li>a'));
			let secondLevelA = Array.from($('menu-clab .second-level-menu>li>a'));

			for(let e of firstLevelA){
				if(location.hash.search(e.getAttribute('href')) > -1)
					e.parentNode.classList.add('active');
				else
					e.parentNode.classList.remove('active');
			}

			for(let e of secondLevelA){
				if(location.hash.search(e.getAttribute('href')) > -1)
					e.parentNode.classList.add('active');
				else
					e.parentNode.classList.remove('active');
			}
		},10)
	}

	_openItem(evt){
		let selector = 'menu-clab .first-level-menu>li>a, menu-clab .second-level-menu>li>a';
		for(let e of $(selector)){
			if(location.hash.search(e.getAttribute('href')) > -1)
				e.parentNode.classList.add('active');
			else
				e.parentNode.classList.remove('active');
		}

		for(let e of $('menu-clab .first-level-menu>li')){
			e.classList.remove('open');
		}

		if(evt.currentTarget.nextElementSibling.tagName === 'UL'){
			evt.preventDefault();
			evt.currentTarget.parentNode.classList.add('open');
			for(let e of $(selector)){
				e.parentNode.classList.remove('active');
			}
			evt.currentTarget.parentNode.classList.add('active');
		}
	}

	_activeItem(evt){
		let selector = 'menu-clab .second-level-menu>li>a';
		for(let e of $(selector)){
			e.parentNode.classList.remove('active');
		}
		evt.currentTarget.parentNode.classList.add('active')
	}

	_iosMenu(){
		$('body main').on('click', (evt) => {
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
					for(let e of $('menu-clab .first-level-menu>li')){
						e.classList.remove('open');
					}
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