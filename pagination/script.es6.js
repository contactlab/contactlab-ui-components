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
				value: []
			},
			currentPage: {
				type: Number,
				notify: true,
				value: 1,
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
		this.async(function(){
			this._updateAvailablePages();
			this.addEventListener('pageChanged', this.updateSelectedPage);
		},500);
	}



	/*---------- 
	EVENT HANDLERS
	----------*/
	setThisAsCurrent(evt){
		evt.preventDefault(); // forse da togliere
		var i = evt.target.getAttribute('data-index');

		if(i >= 0){
			this.fire('change', {index: i});
		}
		
	}

	updateSelectedPage(evt){
		var i = Number(evt.detail.index);
		this.querySelector('.active').classList.remove('active');
		this.querySelectorAll('.page')[i].classList.add('active');
		this.currentPage = i+1;
		
	}



	/*---------- 
	OBSERVERS
	----------*/
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
		if(i==this.currentPage-1) 
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
		return pages[cur-2];
	}
	_getNextPage(pages, cur){
		return pages[cur];
	}
	_getStart(pages, cur){
		let i = cur-1;
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
		let i = cur-1;
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

