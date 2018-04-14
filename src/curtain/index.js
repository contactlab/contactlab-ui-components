'use strict';

import { PolymerElement } from '@polymer/polymer/polymer-element';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import template from './view.html';
import props from './props';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/polymer/lib/elements/dom-repeat';

class CurtainClab extends mixinBehaviors([LegacyElementMixin], PolymerElement) {

  static get is() { return 'curtain-clab'; }

  static get template() { return template; }

  static get properties() { return props; }

  static get observers() {
    return [
      '_setLiHeight(options, maxInView, disabled)',
      '_compStyles(_hidden, _listMaxHeight, _listHeight, open)'
    ]
  }

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('mousedown', evt => {
      switch(evt.target.localName) {
        case 'ol':
          this.dontHide = true;
          break;
       /* case 'li':
          this.dontHide = false;
          let i = evt.target.getAttribute('data-i');
          this.dispatchEvent(new CustomEvent('do-select', {
            bubbles: true,
            composed: true,
            detail: {
              index: i
            }
          }));
          break;*/
        default:
          this.dontHide = false;
      }
    });
    this.addEventListener('mouseup', evt => {
      this.dontHide = false;
    });
  }

  _elementSelection(evt){
    this.dontHide = false;
    let index = evt.target.getAttribute('data-i');
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
    if (options != undefined && maxInView != undefined && !disabled) {
      setTimeout(() => {
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



customElements.define(CurtainClab.is, CurtainClab);
