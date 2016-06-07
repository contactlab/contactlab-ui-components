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
			submenu:Object,
			currentHash:String,

			_mainNav:{
				type:Boolean,
				value:false
			}
		};

		this.observers=[
			'_updateCurrent(menu, currentHash)'
		]
	}

	attached(){
		this._iosMenu();
	}



	/*----------
	EVENT HANDLERS
	----------*/
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
			this.set('_mainNav',true);
		} else {
			this.set('_mainNav',false);
		}
	}

	_linkClicked(evt){
		let target=evt.target;
		while(target.localName!='a'){ target=target.parentNode; }
		this.fire('a-click', {href:target.getAttribute('href')});
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
					this.querySelector('.logo a').focus();
					break;
			}
		});
	}



	/*----------
	OBSERVERS
	----------*/
	_updateCurrent(menu, currentHash){
		if(menu!=undefined && menu.length>0 && currentHash!=undefined) {
			let current=menu.filter(item=>{
				return item.url.split('/')[1] == currentHash.split('/')[1];
			});

			if(current.length>0){
				let menuItem=current[0];
				this.set('submenu', menuItem.submenu || undefined);
				this.fire('menuchange', {
					label: menuItem.label,
					links: menuItem.submenu || []
				});

			} else {
				this.fire('hashnotfound');
			}

			if(window.innerWidth>960){
				this.set('_mainNav',true);
			}
		}
	}



	/*----------
	COMPUTE
	----------*/
	_visibleMenu(menu){
		if(menu!=undefined){
			let arr=[];
			menu.map(obj=>{
				if(obj.visible || obj.visible==undefined) arr.push(obj);
			});
			return arr;
		}
	}

	getIndex(item){
		let i=-1;
		this.menu.map((voce, n)=>{
			if(voce.label === item.label) i=n;
		});
		return i;
	}

	_computeUrl(item){
		let url;
		if(this.firstChild && item.submenu){
			if(item.submenu[0].submenu) // 3 levels
				url = item.submenu[0].submenu[0].url;
			else // 2 levels
				url = item.submenu[0].url;
		} else {
			url = item.url;
		}
		return url;
	}

	_computeActive(hash, url){
		let arr = [];
		if(hash.search(url) > -1) arr.push('active');
		return arr.join(' ');
	}

	_computeTitleIcon(icon){
		return ['clab-icon',icon].join(' ');
	}

	_compMainNav(str, show){
		let arr=[str];
		if(show) arr.push('show');
		return arr.join(' ');
	}

}


Polymer(MenuClab);
