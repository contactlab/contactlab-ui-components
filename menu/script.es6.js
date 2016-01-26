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
			menu: {
				type: Array,
				value: []
			},
			link: {
				type:String,
				value: '/'
			},
			draft:{
				type:String,
				value:null
			},
			firstChild:{
				type:Boolean,
				value:false
			},
			submenu:{
				type:Object
			},
			_url: {
				type: String
			}
		}
	}

	attached(){
		this._url = location.hash;
		window.addEventListener('hashchange', (evt) => {
			this._url = location.hash;
		});

		this._iosMenu();
	}



	/*---------- 
	EVENT HANDLERS
	----------*/
	_openItem(evt){
		this._url = location.hash;
		if(window.innerWidth<961){
			this.querySelector('.main-menu').style.display='none';
		}
	}

	_toggleMenu(evt){
		switch(evt.target.localName){
			case 'i':
				var open=evt.target.parentNode.classList.contains('open-menu');
				break;
			case 'div':
				var open=evt.target.classList.contains('open-menu');
				break;
		}
		if(open){
			this.querySelector('.main-menu').style.display='block';
		} else {
			this.querySelector('.main-menu').style.display='none';
		}
	}



	/*---------- 
	METHODS
	----------*/
	_setSubmenu(current){
		if(current.submenu){
			this.set('submenu', current.submenu);
			this.fire('subchange', {links:current.submenu});
		}
		else {
			this.set('submenu', undefined);
			this.fire('subchange', {links:[]});
		}
	}

	_iosMenu(){
		document.querySelector('body').addEventListener('click', (evt) => {
			switch(evt.target.nodeName){
				case 'INPUT':
				case 'BUTTON':
				case 'TEXTAREA':
				case 'LABEL':
				case 'SELECT':
					return true;
					break;
				default:
					this.querySelector('#main-logo a').focus();
					break;
			}
		});
	}



	/*---------- 
	COMPUTE
	----------*/
	_computeUrl(item){
		if(this.firstChild && item.submenu){
			if(item.submenu[0].submenu){ // 3 levels
				return item.submenu[0].submenu[0].url;
			} else { // 2 levels
				return item.submenu[0].url;
			}
		} else {
			return item.url;
		}
	}

	_computeActive(url,link, i){
		let arr = [];
		if(url.search(link) > -1) {
			arr.push('active');
			this._setSubmenu(this.menu[i]);
		} 
		return arr.join(' ');
	}

	_computeTitleIcon(icon){
		return ['clab-icon',icon].join(' ');
	}

}


Polymer(MenuClab);