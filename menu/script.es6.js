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
		let i = parseInt(evt.currentTarget.dataset.index);

		this._url = location.hash;
		if(this.menu[i].submenu) this.fire('enable-submenu', this.menu[i].submenu);
		/*if(this.menu[i].submenu){
			if(this.firstChild){
				this._url=this.menu[i].submenu[0].url;
			} else {
				this._url = this.menu[i].url;
			}
			this.fire('enable-submenu', this.menu[i].submenu);
		} else {
			this._url = location.hash;
		}*/

	}

	_toggleMenu(evt){
		var open=evt.target.parentNode.classList.contains('open-menu');
		if(open){
			this.querySelector('.main-menu').style.display='block';
		} else {
			this.querySelector('.main-menu').style.display='none';
		}
	}



	/*---------- 
	METHODS
	----------*/
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
			return item.submenu[0].url;
		} else {
			return item.url;
		}
	}

	_computeActive(url,link,open){
		let arr = [];
		url.search(link) > -1 ? arr.push('active') : null;
		return arr.join(' ');
	}

	_computeTitleIcon(icon){
		return ['clab',icon].join(' ');
	}

}


Polymer(MenuClab);