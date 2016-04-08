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
				value: [],
				observer: '_init'
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
			_url: String,
			_mainNav:{
				type:Boolean,
				value:false
			}
		}
	}

	attached(){
		window.addEventListener('hashchange', this._updateUrl.bind(this));
		this._iosMenu();
	}



	/*----------
	OBSERVERS
	----------*/
	_init(val, oldval){
		if( val!=undefined && val.length>0 && (oldval==undefined || oldval.length==0) ){
			this._updateUrl();
		}
	}



	/*----------
	EVENT HANDLERS
	----------*/
	_updateUrl(evt){
		this._url = location.hash;
		let current=this.menu.filter(item=>{
			return item.url.split('/')[1]===this._url.split('/')[1];
		})
		this._handleEventFire(current[0]);

		if(window.innerWidth>960){
			this.set('_mainNav',true);
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
			this.set('_mainNav',true);
		} else {
			this.set('_mainNav',false);
		}
	}



	/*----------
	METHODS
	----------*/
	_handleEventFire(current){
		if(current){
			if(current.submenu){
				this.set('submenu', current.submenu);
				this.fire('menuchange', {
					label:current.label,
					links:current.submenu
				});
			}
			else {
				this.set('submenu', undefined);
				this.fire('menuchange', {
					label:current.label,
					links:[]
				});
			}
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
					this.querySelector('.logo a').focus();
					break;
			}
		});
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

	_computeActive(url,link){
		let arr = [];
		if(url.search(link) > -1) arr.push('active');
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
