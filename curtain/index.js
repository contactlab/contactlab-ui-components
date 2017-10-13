'use strict';


import './view.html';

class CurtainClab {

  beforeRegister() {
    this.is = "curtain-clab";
    this.properties = {
      id: String,
      options: {
        type: Array,
        value: []
      },
      highlighted: {
        type: Object,
        value: {}
      },
      labelField: String,
      valueField: String,
      dontHide: {
        type: Boolean,
        notify: true
      },
      maxInView: Number,
      disabled: {
        type: Boolean,
        value: false
      },
      open: {
        type: Boolean,
        value: false
      },
      //_liHeight:Number,
      maxHeight: {
        type: Number,
        value: 28
      },
      _listMaxHeight: String,
      _listHeight: String,
      _hidden: {
        type: Boolean,
        value: false
      },
      _computedStyles: String
    };

    this.observers = [
			'_setLiHeight(options, maxInView, disabled)',
			'_compStyles(_hidden, _listMaxHeight, _listHeight, open)'
		]
  }

  attached() {
    this.addEventListener('mousedown', evt => {
      switch(evt.target.localName) {
        case 'ol':
          this.dontHide = true;
          break;
       /*  case 'li':
          this.dontHide = false;
          let i = evt.target.getAttribute('data-i');
          this.dispatchEvent(new CustomEvent('do-select', {
            bubbles: true,
            composed: true,
            detail: {
              index: i
            }
          }));
          break; */
        default:
          this.dontHide = false;
      }
    });
    this.addEventListener('mouseup', evt => {
      this.dontHide = false;
    });
  }

  _elementSelection(evt) {
    this.dontHide = false;
    let i = evt.target.getAttribute('data-i');
    this.dispatchEvent(new CustomEvent('do-select', {
      bubbles: true,
      composed: true,
      detail: {
        index: i
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
    if(options != undefined && maxInView != undefined && !disabled) {
      this.async(() => {
        if(this.maxHeight == undefined || this.maxHeight == '') {
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
    if(maxHeight !== undefined) arr.push('max-height:' + maxHeight);
    if(height !== undefined) arr.push('height:' + height);
    if(open) arr.push('display:block');
    this.set('_computedStyles', arr.join(';'));
  }





  /*----------
  	PUBLIC
  ----------*/
  scrollToHighlight(i, goesUp) {
    let offsetTop = this.$.list.children[i].offsetTop,
      scrollTop = this.$.list.scrollTop,
      h = this.$.list.clientHeight,
      visible = (offsetTop < scrollTop || offsetTop >= (scrollTop + h)) ? false : true;

    if(!visible && !goesUp) this.$.list.scrollTop += this.$.list.clientHeight;
    else if(!visible && goesUp) this.$.list.scrollTop -= this.$.list.clientHeight;
  }

}



Polymer(CurtainClab);
