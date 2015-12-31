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
			/*range: {
				type: Number,
				value: 5
			}, -------------> to implement later, maybe */


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
			this.querySelectorAll('.page')[this.currentPage-1].classList.add('active');
			this._updateAvailablePages();
			this.addEventListener('pageChanged', this.updateSelectedPage);
		},500);
	}



	/*---------- 
	EVENT HANDLERS
	----------*/
	updateSelectedPage(evt){
		var i = evt.detail.index;
		this.$$('.active').classList.remove('active');
		this.querySelectorAll('.page')[i].classList.add('active');
		this.currentPage = Number(i)+1;
	}

	setThisAsCurrent(evt){
		evt.preventDefault(); // forse da togliere

		if(evt.path[0].getAttribute('data-index') != null)
			var i = evt.path[0].getAttribute('data-index');
		else
			var i = evt.target.children[0].getAttribute('data-index');

		if(i >= 0){
			this.fire('pageChanged', {index: i});
		}
		
	}



	/*---------- 
	OBSERVERS
	----------*/
	_updateAvailablePages(){ 
		for(let idx in Array.from(this.querySelectorAll('.page'))){
			let pagesEl = this.querySelectorAll('.page');
			if(idx >= this.availableStart && idx <= this.availableEnd){
				pagesEl[idx].classList.remove('invisible');
			} else {
				pagesEl[idx].classList.add('invisible');
			}
		}
	}



	/*---------- 
	COMPUTED
	----------*/
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

