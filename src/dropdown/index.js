'use strict';

import props from './props';
import './view.html';
import { dashify, viewLabel } from './../_libs/utils';
import { isNil, isNilOrEmptyStr, randomId, propLowerCase, setOptionsList } from './libs';
import "./../input/";
import "./../note/";
import "./../curtain/";
import './../_libs/path';


class DropdownClab {

  get behaviors() {
    return [{ _isNilOrEmptyStr: isNilOrEmptyStr, dashify, viewLabel }];
  }

  beforeRegister() {
    this.is = "dropdown-clab";
    this.properties = props;
    this.observers = [
      '_triggerFetchOptions(url)',
      '_setOptions(optionsFn)'
    ]
  }

  attached() {
    if(isNilOrEmptyStr(this.id)){
      this.set('id', randomId());
    }
  }

  _setSearchValue(evt) {
    if (evt.target.value === '' && this.isValidSelection) {
      this.dispatchEvent(
        new CustomEvent('deselect', {
          bubbles: true,
          composed: true
        })
      );
    }
    this.set('searchValue', evt.target.value);
  }


  /*----------
  EVENT HANDLERS
  ----------*/
  _handleSelect(evt) {
    const selected = this._optionsVisible[evt.detail.index];
    const oldValue = this.selected;

    this.set('selected', selected);
    this.set('highlighted', selected);
    this.set('open', false);
    this.set('searchValue', null);

    if(!this.preventChange) {
      if(this.resultAsObj){
        return this.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: {
            selected,
            newValue: selected,
            oldValue
          }
        }));
      }

      return this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          selected: selected[this.valueField],
          newValue: selected,
          oldValue
        }
      }));
    }
  }

  _handleHighlight(evt) {
    this.set('highlighted', this._optionsVisible[evt.detail.index]);
  }

  _stop(evt) {
    evt.stopPropagation();
  }


  /*----------
  METHODS
  ----------*/
  _fetchOptions() {
    fetch(this.url, {
      method: 'GET'
    }).then(res => {
      if(res.status !== 200) {
        console.warn('Looks like there was a problem. Status Code: ' + res.status);
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

  /*----------
  OBSERVERS
  ----------*/
  _setOptions(promise) {
    if(!isNil(promise)) {
      promise().then(resp => this.set('options', resp));
    }
  }

  _triggerFetchOptions(url) {
    if(!isNil(url)) {
      this._fetchOptions();
    }
  }


  /*----------
  COMPUTED
  ----------*/
  _updateVisibleOptions(options, searchValue, labelField) {
    return setOptionsList(options, searchValue, labelField);
  }

  _compIcon(icon) {
    return !isNilOrEmptyStr(icon)
      ? `clab-icon ${icon}`
      : '';
  }

  _compWrapperType(disabled, type, inline, labelSize) {
    let arr = [];

    if(disabled){
      arr.push('disabled');
    }
    if(!isNilOrEmptyStr(type)){
      arr.push(type);
    }
    if(inline) {
      arr.push('inline');
      if(!isNilOrEmptyStr(labelSize)){
        arr.push(`${labelSize}-label`);
      }
    }

    return arr.join(' ');
  }

  _compType(disabled, type, id) {
    let arr = [];

    if(!isNilOrEmptyStr(id)){
      arr.push(id);
    }
    if(disabled){
      arr.push('disabled');
    }
    if(!isNilOrEmptyStr(type)){
      arr.push(type);
    }

    return arr.join(' ');
  }

  _compSelectedLabel(option, label) {
    return !isNil(option) && !isNilOrEmptyStr(label)
      ? option[label]
      : null;
  }

  _compIsValidSelection(selected, options, label) {
    return !isNil(selected) && Array.isArray(options)
      ? typeof options.find(o => o[label] === selected[label]) !== 'undefined'
      : false;
  }

  _compLabelClass(selectedLabel, placeholder) {
    return !isNilOrEmptyStr(selectedLabel)
      ? 'selected'
      : 'placeholder';
  }

  _compLabelVisible(selectedLabel, placeholder) {
    return !isNilOrEmptyStr(selectedLabel)
    ? selectedLabel
    : placeholder;
  }

  _compMaxHeight(height) {
    return !isNil(height)
      ? height
      : '';
  }

  _compToggleList(disabled, id) {
    return evt => {

      if (!disabled) {
        const isSpan = e => e.target.localName === 'span' && e.path[4] && e.path[4].id === id;
        const isDiv = e => e.target.localName === 'div' && e.path[3] && e.path[3].id === id;
        const isInput = e => e.target.localName === 'input' && e.path[3] && e.path[3].id === id;

        if((isSpan(evt) || isDiv(evt))){
          this.set('open', !this.open);
        }

        if(isInput(evt) && !this.open) {
          this.set('open', true);
        }

        const windowClick = evt => {
          const isOl = e => e.target.localName === 'ol' && e.target.classList.contains('curtain-clab');
          const isLi = e => e.target.localName === 'li' && e.target.classList.contains('curtain-clab');

          if(isLi(evt) || isDiv(evt) || isSpan(evt)) {
            return window.removeEventListener('mousedown', windowClick);
          }

          if(isOl(evt) || isInput(evt)) {
            return;
          }

          this.set('open', false);
          this.set('searchValue', null);
          return window.removeEventListener('mousedown', windowClick);
        }


        if(!this.open) {
          this.set('searchValue', null);
        }
        return window.addEventListener('mousedown', windowClick);
      }
    }
  }

  _compSearchVisibleValue(searchValue, selectedLabel) {
    if(!isNilOrEmptyStr(selectedLabel)) {
      return isNil(searchValue)
        ? selectedLabel
        : searchValue
    }

    return searchValue;
  }




  getSelectedLabel() {
    return this.selected[this.labelField];
  }

  getSelectedValue() {
    return this.selected[this.valueField];
  }

  setByLabel(str) {
    this.options.map(opt => {
      if (opt[this.labelField] === str) {
        this.set('selected', opt);
        return;
      }
    });
  }

  setByValue(str) {
    this.options.map(opt => {
      if (opt[this.valueField] === str) {
        this.set('selected', opt);
        return;
      }
    });
  }

  isValorized() {
    return !this.isNotValorized();
  }

  isNotValorized() {
    return this.selected === undefined ||
      this.selected === null ||
      this.selected[this.valueField] === undefined ||
      this.selected[this.valueField] === null;
  }

  setValue(obj, prevent) {
    prevent = prevent ? true : false;
    this.preventChange = prevent;

    if (typeof obj === 'object') {
      this.set('selected', obj);
    } else {
      this.options.map(opt => {
        if (opt[this.valueField] === obj) {
          this.set('selected', opt);
          return;
        }
      });
    }

    this.preventChange = false;
  }

  getValue() {
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

  getValueObject() {
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


Polymer(DropdownClab);
