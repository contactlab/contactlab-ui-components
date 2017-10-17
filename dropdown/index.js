'use strict';

import './view.html';
import { UtilBehavior, DropdownBehavior} from "./../_behaviors/";
import { isNil, isNilOrEmptyStr, randomId, propLowerCase } from './libs';
import "./../input/";
import "./../note/";
import "./../curtain/";
import './../_behaviors/path';


class DropdownClab {

  get behaviors() {
    return [{
      _isNilOrEmptyStr: isNilOrEmptyStr
    }, UtilBehavior, DropdownBehavior];
  }

  beforeRegister() {
    this.is = "dropdown-clab";
    this.properties = {
      id: {
        type: String
      },
      label: {
        type: String,
        value: null
      },
      icon: {
        type: String,
        value: ''
      },
      type: {
        type: String,
        value: ''
      },
      noteType: {
        type: String
      },
      selected: {
        type: Object,
        value: null
      },
      selectedLabel: {
        type: String,
        value: null,
        computed: '_compSelectedLabel(selected, labelField)'
      },
      highlighted: Object,
      valueField: {
        type: String,
        value: 'value'
      },
      labelField: {
        type: String,
        value: 'label'
      },
      options: {
        type: Array,
        value: [
          {
            label: '-',
            value: null
          }
        ]
      },
      _optionsVisible: {
        type: Array,
        value: [],
        computed: '_updateVisibleOptions(options, searchValue, labelField)'
      },
      optionsFn: {
        type: Function
      },
      url: {
        type: String
      },
      inline: {
        type: Boolean,
        value: false
      },
      open: {
        type: Boolean,
        value: false
      },
      labelSize: {
        type: String,
        value: ''
      },
      placeholder: {
        type: String,
        value: 'Select..'
      },
      disabled: {
        type: Boolean,
        value: false
      },
      preventChange: {
        type: Boolean,
        value: false
      },
      resultAsObj: {
        type: Boolean,
        value: false
      },
      maxInView: {
        type: Number,
        value: 4
      },
      maxHeight: {
        type: Number,
        value: 28
      },
      search: {
        type: Boolean,
        value: false
      },
      searchValue: {
        type: String,
        value: null
      },
      _toggleList: {
        type: Function,
        computed: '_compToggleList(disabled, id)'
      }
    };
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
    if(!isNil(options) && options.constructor === Array) {
      const toSearch = !isNilOrEmptyStr(searchValue)
        ? searchValue.toLowerCase()
        : '';
      const optionsVisible = options.filter(o => propLowerCase(o, labelField).search(toSearch) > -1);
      return optionsVisible;
    }
    return [];
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


}



Polymer(DropdownClab);
