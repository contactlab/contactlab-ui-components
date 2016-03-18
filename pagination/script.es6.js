class PaginationClab{

	get behaviors() {
      return [UtilBehavior];
    }

	beforeRegister(){
		this.is = "pagination-clab";
		this.properties = {
			tot:{
				type:Number,
				observer:'_setPages'
			},
			links:Array,
			pages: {
				type: Array,
				notify: true,
				value: []
			},
			currentPage: {
				type: Number,
				notify: true,
				value: 0
			},
			firstPage: {
				type: String,
				value: 0
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
				computed: '_getStart(currentPage, pages)'
			},
			availableEnd: {
				type: Number,
				computed: '_getEnd(currentPage, pages)'
			}
		}
	}



	/*----------
	EVENT HANDLERS
	----------*/
	_setCurrent(evt){
		let i;
		let type;
		switch(evt.target.localName){
			case 'i':
				i = Number(evt.target.parentNode.getAttribute('data-index'));
				type=evt.target.parentNode.getAttribute('data-type');
				break;
			case 'li':
				i = Number(evt.target.getAttribute('data-index'));
				type=evt.target.getAttribute('data-type');
				break;
		}

		if((type && this[type+'Page']==undefined) || (type && this[type+'Page']==this.currentPage)) return;
		if(i >= 0 && i<=this.lastPage){
			this.set('currentPage', i);
			this.fire('change', {currentPage: i});
		}
	}



	/*----------
	OBSERVERS
	----------*/
	_setPages(val){
		if(val!=undefined){
			let arr=[];
			for(let i=0; i<val; i++){
				arr.push(i);
			}
			this.set('pages', arr);
		}
	}



	/*----------
	COMPUTERS
	----------*/
	_compVisiblePages(start, end){
		let arr=[];
		this.pages.map((page, idx)=>{
			if(idx >= start && idx <= end){
				arr.push(page);
			}
		});
		return arr;
	}

	_computeActive(cur, i){
		var arr=['page'];
		if(i==cur) arr.push('active');
		return arr.join(' ');
	}


	_getLastPage(pages){
		return pages.length-1;
	}
	_getPrevPage(pages, cur){
		return pages[cur-1];
	}
	_getNextPage(pages, cur){
		return pages[cur+1];
	}
	_getStart(cur, pages){
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
	_getEnd(cur, pages){
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
