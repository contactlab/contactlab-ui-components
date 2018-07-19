'use strict';

import props from './props';
import './view.html';

class CurtainClab {
	
  beforeRegister() {
    this.is = 'curtain-clab';
    this.properties = props;
    this.observers = [
      '_setLiHeight(options, maxInView, disabled)',
      '_compStyles(_hidden, _listMaxHeight, _listHeight, open)'
    ];
  }
  
  attached() {
    this.addEventListener('mousedown', evt => {
      switch(evt.target.localName) {
        case 'ol':
          this.dontHide = true;
          break;
        default:
          this.dontHide = false;
      }
    });
    this.addEventListener('mouseup', () => {
      this.dontHide = false;
    });
  }
  
  _elementSelection(evt) {
    this.dontHide = false;
    const index = evt.target.getAttribute('data-i');
    this.dispatchEvent(new CustomEvent('do-select', {
      bubbles: true,
      composed: true,
      detail: {
        index
      }
    }));
  }
  
  
  /*----------
  EVENT HANDLERS
  ----------*/
  doHighlight(evt) {
    const i = evt.target.getAttribute('data-i');
    this.dispatchEvent(new CustomEvent('do-highlight', {
      bubbles: true,
      composed: true,
      detail: {
        index: i
      }
    }));
  }
  
  
  /*----------
  METHODS
  ----------*/
  _setLiHeight(options, maxInView, disabled) {
    if(typeof options !== 'undefined' && typeof maxInView !== 'undefined' && !disabled) {
      this.async(() => {
        if(typeof this.maxHeight === 'undefined' || this.maxHeight == '') {
          this.set('_hidden', true);
          this.maxHeight = 28;
          this.set('_listMaxHeight', (this.maxHeight * maxInView) + 'px');
          this.set('_hidden', false);
        } else {
          this.set('_hidden', true);
          this.set('_listMaxHeight', (this.maxHeight * maxInView) + 'px');
          this.set('_hidden', false);
        }
        
        const listHeight = options.length > 0
          ? `${this.maxHeight * options.length}px`
          : '0px';
        this.set('_listHeight', listHeight);
        this.$$('#list') ? this.$$('#list').scrollTop = 0 : null;
      }, 100);
    }
  }
  
  /*----------
  COMPUTERS
  ----------*/
  _compHighlight(highlighted, option) {
    return(highlighted[this.valueField] === option[this.valueField]) ? 'selected' : '';
  }
  
  _compLabel(opt) {
    return opt[this.labelField];
  }
  
  _compStyles(hidden, maxHeight, height, open) {
    let arr = [];
    if(hidden) arr.push('display:block; opacity:0');
    if(typeof maxHeight !== 'undefined') arr.push('max-height:' + maxHeight);
    if(typeof height !== 'undefined') arr.push('height:' + height);
    if(open) arr.push('display:block');
    this.set('_computedStyles', arr.join(';'));
  }
  
  
  /*----------
  PUBLIC
  ----------*/
  scrollToHighlight(i, goesUp) {
    const list = this.querySelector('#list');
    const offsetTop = list.children[i].offsetTop;
    const scrollTop = list.scrollTop;
    const h = list.clientHeight;
    const visible = (offsetTop < scrollTop || offsetTop >= (scrollTop + h)) ? false : true;
    
    if(!visible && !goesUp){ 
      list.scrollTop += list.clientHeight;
    } else if(!visible && goesUp){ 
      list.scrollTop -= list.clientHeight;
    }
  }
	
}


Polymer(CurtainClab);
