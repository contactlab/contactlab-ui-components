'use strict';

import { PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import { getIndex } from './../_libs/utils';
import "./../input";
import "./../spinner";
import "./../curtain";

class AutoCompleteClab extends PolymerElement {

  static get is() { return 'autocomplete-clab'; }

  static get template() { return template; }

  static get properties() { return props }


  /*----------
  EVENT HANDLERS
  ----------*/
  _handleKeyboardInputs(evt) {
    // If Enter
    if(evt.keyCode == 13 && this._currentHint != undefined) {
      // this.setSelected(this._currentHint);
      this.set('selected', this._currentHint);
      this.querySelector('input-clab input').blur();
      this.results = [];
      return;
    }

    //If Arrows
    if(this.results.length > 0 && evt.keyCode == 38 && this._currentHint != undefined) {
      evt.preventDefault();
      this._handleArrows('up');
      return;
    }
    if(this.results.length > 0 && evt.keyCode == 40 && this._currentHint != undefined) {
      evt.preventDefault();
      this._handleArrows('down');
      return;
    }

    // If typing
    if(this._inputString.length > this.minChar) {
      this.dispatchEvent(new CustomEvent('typing',{
        bubbles: true,
        composed: true
      }));
      if(typeof this._interval == 'number') {
        window.clearTimeout(this._interval);
        this._interval = undefined;
      }

      if(this.url != undefined) {
        this._interval = window.setTimeout(() => {
          this._fetchOptions();
        }, 400);

      } else {
        this._showHints(true);
      }

    } else {
      this.$.curtain.open = false;
    }
  }

  _handleHighlight(evt) {
    this._currentHint = this.results[evt.detail.index];
  }

  handleSelect(evt) {
    // this.setSelected(this.results[evt.detail.index]);
    this.set('selected', this.results[evt.detail.index]);
  }

  _handleBlur(evt) {
    if(this.dontHide) {
      evt.preventDefault();
      return;
    }

    this.$.curtain.open = false;
    if(this.selected == undefined || this.selected[this.labelField] != this._inputString) {
      this._inputString = '';
      this._currentHint = undefined;
    }
  }



  /*----------
  METHODS
  ----------*/
  _fetchOptions() {
    window.clearTimeout(this._interval);
    this._interval = undefined;
    this._startSpinnerTimeout();

    fetch(this.url, {
      method: 'GET'
    }).then(res => {
      if(res.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + res.status);
        this.type = 'error';
        this._resetSpinnerTimeout();
        return;
      }

      res.json().then((data) => {
        this.set('options', data);
        if(this.type === 'error') this.type = '';
        this.async(() => {
          this._showHints(this.filter);
          this._resetSpinnerTimeout();
        }, 50);
      });

    }).catch(err => {
      console.error("Fetch Error ==> ", err);
      this.type = 'error';
      this._resetSpinnerTimeout();
    });
  }

  _showHints(filter) {
    let searchVal = this._inputString.toLowerCase();
    if(!filter) {
      this.set('results', this.options);
    } else {
      let results = [];
      this.options.map((opt, i) => {
        if(opt[this.labelField].toLowerCase().search(searchVal) > -1) results.push(this.options[i]);
      });
      this.set('results', results);
    }

    // handle list visual
    if(this.results.length > 0) {
      this._currentHint = this.results[0];
      this.$.curtain.open = true;
    } else {
      this.$.curtain.open = false;
      this._currentHint = undefined;
      console.info('No hint was found');
    }
  }

  _handleArrows(type) {
    let HIdx = getIndex(this._currentHint, this.results);
    let item;
    switch(type) {
      case 'up':
        item = this.results[HIdx - 1];
        if(typeof item == 'object') {
          this._currentHint = item;
          this.$.curtain.scrollToHighlight(HIdx - 1, true);
        }
        break;
      case 'down':
        item = this.results[HIdx + 1];
        if(typeof item == 'object') {
          this._currentHint = item;
          this.$.curtain.scrollToHighlight(HIdx + 1, false);
        }
        break;
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

  _changedSelected(val, old) {
    if(val != undefined && Object.keys(val).length > 0) {
      this._inputString = this.selected[this.labelField];
      this._currentHint = undefined;

      if(this.resultAsObj) {
        this.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: {
            'selected': this.selected,
            'value': this.selected
          }
        }));
      } else {
        this.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: {
            'selected': this.selected.label,
            'value': this.selected.label
          }
        }));
      }
    }
  }




  /*----------
  UTILS
  ----------*/
  _startSpinnerTimeout() {
    this._interval = window.setTimeout(() => {
      if(!this._spinner) this._spinner = true;
    }, 400);
  }

  _resetSpinnerTimeout() {
    window.clearTimeout(this._interval);
    this._interval = undefined;
    if(this._spinner) this._spinner = false;
  }

  _setLabelSize(newSize) {
    this.set("labelSize", newSize)
  }


  /*----------
  PUBLIC
  ----------*/
  setSelected(obj) {
    this.set('selected', obj);
  }

}

customElements.define(AutoCompleteClab.is,AutoCompleteClab);
