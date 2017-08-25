'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import { dashify, viewLabel } from './../_libs/utils';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import "./../note";
import "./../curtain";
import "./../input";

class DropdownClab extends mixinBehaviors([{ dashify, viewLabel }], PolymerElement) {

  static get is() { return 'dropdown-clab'; }

  static get template() { return template; }

  static get properties() { return props; }

  connectedCallback(){
    super.connectedCallback();
    if(this.id === undefined || this.id.length < 1) {
      let id = '';
      let possible = "abcdefghijklmnopqrstuvwxyz";
      let n = Math.floor(Math.random() * (999 - 0) + 0);
      let time = Date.now();
      for(var i = 0; i < 2; i++) id += possible.charAt(Math.floor(Math.random() * possible.length));
      id += n;
      id += time;
      this.id = id;
    }
  }



  /*----------
  EVENT HANDLERS
  ----------*/
  _toggleList(evt) {
    if(!this.disabled) {
      this.open = !this.open;
    }

    let windowClick = (evt) => {
      let name = evt.target.localName;
      let hasClass = evt.target.classList.contains('curtain-clab');
      let hasIdentity = evt.target.classList.contains(this.id);

      if(name == 'ol' && hasClass) {
        return;
      } else if(name == 'li' && hasClass || name == 'span' && evt.target.parentNode.classList.contains(this.id) || name == 'div' && hasIdentity) {
        window.removeEventListener('mousedown', windowClick);
        return;
      } else {
        this.open = false;
        window.removeEventListener('mousedown', windowClick);
      }
    }
    window.addEventListener('mousedown', windowClick);
  }

  handleSelect(evt) {
    this._setSelected(this.optionsList[evt.detail.index]);
  }

  _handleHighlight(evt) {
    this.set('highlighted', this.options[evt.detail.index]);
  }

  _filter(evt) {
    this.searchValue = evt.target.value;
    this.searchValue.length > 0 ? this.optionsList = this.options.filter((e, i) => {
      return e[this.labelField].search(this.searchValue) > -1;
    }) : this.optionsList = this.options.slice();
  }


  /*----------
  METHODS
  ----------*/
  _fetchOptions() {
    fetch(this.url, {
      method: 'GET'
    }).then(res => {
      if(res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + res.status);
        this.type = 'error';
        return;
      }

      res.json().then((data) => {
        this.set('options', data);
      });

    }).catch(err => {
      console.error("Fetch Error ==> ", err);
      this.type = 'error';
    });
  }

  _setSelected(item) {
    let old = this.selected;
    this.optionsList = this.options.slice();
    this.set('selected', item);
    this.set('highlighted', item);
    this.open = false;
    this.searchValue = this.selected[this.labelField];

    if(!this.preventChange) {
      if(this.resultAsObj){
        this.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: {
            selected: this.selected,
            newValue: this.selected,
            oldValue: old
          }
        }));
      } else {
        this.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: {
            selected: this.selected[this.valueField],
            newValue: this.selected,
            oldValue: old
          }
        }));
      }
    }
  }



  /*----------
  OBSERVERS
  ----------*/
  _setOptions(promise) {
    promise().then((resp) => {
      this.set('options', resp);
    });
  }

  _observUrl(newv, oldv) {
    if(newv != undefined) this._fetchOptions();
  }

  _updateList(newValue, oldValue) {
    const selected = this.selected;
    this.optionsList = newValue ? newValue.slice() : this.optionsList;
    this.searchValue = selected ? selected[this.labelField] : null;
  }


  /*----------
  COMPUTED
  ----------*/
  _viewValue(val, label) {
    if(val && val[label]) {
      return true
    } else {
      return false
    }
  }

  _compIcon(icon) {
    if(icon != undefined && icon.length > 0) return 'clab-icon ' + icon;
    else return '';
  }

  _compWrapperType(str, disabled, type, inline, labelSize) {
    let arr = [str];
    if(disabled) arr.push('disabled');
    if(type != undefined && type.length > 0) arr.push(type);
    if(inline) {
      arr.push('inline');
      if(labelSize.length > 0) arr.push(labelSize + '-label');
    }
    return arr.join(' ');
  }

  _compType(str, disabled, type, id, open) {
    let arr = [];
    if(str != undefined && str.length > 0) arr.push(str);
    if(id != undefined && id.length > 0) arr.push(id);
    if(disabled) arr.push('disabled');
    if(type != undefined && type.length > 0) arr.push(type);
    open ? arr.push('active') : null;
    return arr.join(' ');
  }

  _compValue(option) {
    return option ? option[this.valueField] : '';
  }

  _compLabel(option) {
    return option ? option[this.labelField] : '';
  }

  _compMaxHeight(height) {
    return height ? height : '';
  }




  getSelectedLabel(){
    return this.selected[this.labelField];
  }

  getSelectedValue(){
    return this.selected[this.valueField];
  }

  setByLabel(str) {
    this.options.map(opt => {
      if (opt[this.labelField] === str) {
        this._setSelected(opt);
        return;
      }
    });
  }

  setByValue(str){
    this.options.map(opt => {
      if (opt[this.valueField] === str) {
        this._setSelected(opt);
        return;
      }
    });
  }

  isValorized(){
    return !this.isNotValorized();
  }

  isNotValorized(){
    return this.selected === undefined ||
      this.selected === null ||
      this.selected[this.valueField] === undefined ||
      this.selected[this.valueField] === null;
  }

  setValue(obj, prevent){
    prevent = prevent ? true : false;
    this.preventChange = prevent;

    if (typeof obj === 'object') {
      this._setSelected(obj);
    } else {
      this.options.map(opt => {
        if (opt[this.valueField] === obj) {
          this._setSelected(opt);
          return;
        }
      });
    }

    this.preventChange = false;
  }

  getValue(){
    var v;
    if (this.isNotValorized()) {
      v = undefined;
    } else if (typeof this.selected === 'string' || this.selected instanceof String) {
      v = this.selected;
    } else if (typeof this.selected === "object") {
      v = this.selected[this.valueField];
    } else {
      console.error(this.is + ": Invalid value type [" + (typeof this.selected) + "]");
    }
    return v;
  }

  getValueObject(){
    var v;
    if (this.isNotValorized(this.selected)) {
      v = undefined;
    } else if (typeof this.selected === 'string' || this.selected instanceof String) {
      this.options.map(opt => {
        if (opt[this.valueField] === this.selected) {
          v = opt;
          return;
        }
      });
      if (v === undefined) {
        console.warn(this.is + ": There is no option with value equal to [" + this.selected + "]");
      }
    } else if (typeof this.selected === "object") {
      v = this.selected;
    } else {
      console.warn(this.is + ": Invalid value type [" + (typeof this.selected) + "]");
    }
    return v;
  }


}



customElements.define(DropdownClab.is, DropdownClab);
