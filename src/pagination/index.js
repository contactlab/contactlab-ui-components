import props from './props';
import {
  _computeActive,
  _getLastPage,
  _getPrevPage,
  _getNextPage,
  _hideIfLast,
  _hideIfFirst,
  _pageNumber,
  _compVisiblePages
} from './methods/internal';
import './view.html';

class PaginationClab {
  get behaviors() {
    return [
      {
        _computeActive,
        _getLastPage,
        _getPrevPage,
        _getNextPage,
        _hideIfLast,
        _hideIfFirst,
        _pageNumber,
        _compVisiblePages
      }
    ];
  }

  beforeRegister() {
    this.is = 'pagination-clab';
    this.properties = props;
  }

  _setCurrent(evt) {
    let i;
    let type;
    switch (evt.target.localName) {
      case 'i':
        i = Number(evt.target.parentNode.getAttribute('data-index'));
        type = evt.target.parentNode.getAttribute('data-type');
        break;
      case 'li':
        i = Number(evt.target.getAttribute('data-index'));
        type = evt.target.getAttribute('data-type');
        break;
    }

    if (
      (type && this[type + 'Page'] == undefined) ||
      (type && this[type + 'Page'] == this.currentPage)
    )
      return;
    if (i >= 0 && i <= this.lastPage) {
      this.set('currentPage', i);
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: {
            currentPage: i
          }
        })
      );
    }
  }

  _setPages(val) {
    if (val != undefined) {
      let arr = [];
      for (let i = 0; i < val; i++) {
        arr.push(i);
      }
      this.set('pages', arr);
    }
  }

  _getStart(_c, _pages) {
    const pages = parseInt(_pages);
    const c = parseInt(_c);
    let last = pages.length - 1;
    if (c >= last - this.range / 2) {
      return last - this.range;
    } else if (c <= this.range / 2) {
      return 0;
    } else {
      return c - this.range / 2;
    }
  }

  _getEnd(_c, _pages) {
    const pages = parseInt(_pages);
    const c = parseInt(_c);
    let last = pages.length - 1;
    if (c >= last - this.range / 2) {
      return last;
    } else if (c <= this.range / 2) {
      return this.range;
    } else {
      return c + this.range / 2;
    }
  }
}

Polymer(PaginationClab);
