class PaginationClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "pagination-clab";
		this.properties = {
			pages: {
				type: Array,
				notify: true,
				value: [],
				observer: '_observPages'
			},
			currentPage: {
				type: Number,
				notify: true,
				value: 0,
				observer: '_updateAvailablePages'
			},

			firstPage: {
				type: String,
				computed: '_getFirstPage(pages)'
			},
			lastPage: {
				type: String,
				computed: '_getLastPage(pages)'
			},
			prevPage: {
				type: String,
				computed: '_getPrevPage(pages, currentPage)'
			},
			nextPage: {
				type: String,
				computed: '_getNextPage(pages, currentPage)'
			},
			availableStart: {
				type: Number,
				computed: '_getStart(pages, currentPage)'
			},
			availableEnd: {
				type: Number,
				computed: '_getEnd(pages, currentPage)'
			}
		}
	}

	attached(){
		this.async(this._updateAvailablePages, 100);
	}

	_setThisAsCurrent(evt){
		let i;
		if(typeof evt != 'number'){ // se è event handler
			evt.preventDefault();
			i = Number(evt.target.getAttribute('data-index'));

		} else { // .. o metodo
			i = Number(evt);
		}

		if(i >= 0){
			this.querySelector('.active').classList.remove('active');
			this.querySelectorAll('.page')[i].classList.add('active');
			this.currentPage = i;

			this.fire('change', {currentPage: i});
		}

	}



	/*----------
	OBSERVERS
	----------*/
	_observPages(val, oldval){
		if(oldval!=undefined){
			if(this.currentPage>this._getIndex(this.lastPage, this.pages)){ // se la currentPage è un valore che ora non c'è più la setto all'ultima pagina di quelle nuove
				this._setThisAsCurrent(this._getIndex(this.lastPage, this.pages));
			} else {
				this.async(this._updateAvailablePages, 100);
			}

			this.fire('update');
		}
	}

	_updateAvailablePages(){
		Array.prototype.map.call(this.querySelectorAll('.page'), (el, idx)=>{
			if(idx >= this.availableStart && idx <= this.availableEnd){
				el.classList.remove('invisible');
			} else {
				el.classList.add('invisible');
			}
		});
	}



	/*----------
	COMPUTED
	----------*/
	_computeLiPageClass(i){
		var arr=['page'];
		if(i==this.currentPage)
			arr.push('active');
		return arr.join(' ');
	}

	_getFirstPage(pages){
		return pages[0];
	}
	_getLastPage(pages){
		return pages[pages.length-1];
	}
	_getPrevPage(pages, cur){
		return pages[cur-1];
	}
	_getNextPage(pages, cur){
		return pages[cur+1];
	}
	_getStart(pages, cur){
		let i = cur;
		let last = pages.length-1;
		if(i >= last-3){
			return last-4;
		} else if(i <= 3){
			return 0;
		} else {
			return i-2;
		}
	}
	_getEnd(pages, cur){
		let i = cur;
		let last = pages.length-1;
		if(i >= last-3){
			return last;
		} else if(i <= 3){
			return 4;
		} else {
			return i+2;
		}
	}



	/*----------
	UTILS
	----------*/
	_pageNumber(i){
		return i+1;
	}

}

Polymer(PaginationClab);
