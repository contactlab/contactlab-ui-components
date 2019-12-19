import props from './props';
import filterOptions from './libs/filterOptions';
import './view.html';
import {getIndex} from '../_libs/utils';
import {randomId, isNilOrEmptyStr} from '../dropdown/libs';
import '../input/';
import '../spinner/';
import '../curtain/';

class AutoCompleteClab {
  beforeRegister() {
    this.is = 'autocomplete-clab';
    this.properties = props;
  }

  attached() {
    if (isNilOrEmptyStr(this.id)) {
      this.set('id', randomId());
    }
  }

  /*----------
  EVENT HANDLERS
  ----------*/
  _handleKeyboardInputs(evt) {
    // If Enter
    if (evt.keyCode === 13 && typeof this._currentHint !== 'undefined') {
      return this.setSelected(this._currentHint);
    }

    //If Arrows
    if (
      this.results.length > 0 &&
      evt.keyCode === 38 &&
      typeof this._currentHint !== 'undefined'
    ) {
      evt.preventDefault();
      this._handleArrows('up');
      return;
    }
    if (
      this.results.length > 0 &&
      evt.keyCode === 40 &&
      typeof this._currentHint !== 'undefined'
    ) {
      evt.preventDefault();
      this._handleArrows('down');
      return;
    }

    // If typing
    if (this._inputString.length > this.minChar) {
      this.dispatchEvent(
        new CustomEvent('typing', {
          bubbles: true,
          composed: true
        })
      );
      if (typeof this._interval === 'number') {
        window.clearTimeout(this._interval);
        this._interval = undefined;
      }

      if (typeof this.url !== 'undefined') {
        this._interval = window.setTimeout(() => {
          this._fetchOptions();
        }, 400);
      } else {
        this._showHints(true);
      }
    } else {
      this.querySelector('curtain-clab').open = false;
    }
  }

  _handleHighlight(evt) {
    this._currentHint = this.results[evt.detail.index];
  }

  handleSelect(evt) {
    this.setSelected(this.results[evt.detail.index]);
  }

  _compToggleList(disabled, id) {
    return evt => {
      if (!disabled) {
        const isInput = e =>
          e.target.localName === 'input' && e.path[3] && e.path[3].id === id;

        if (isInput(evt) && !this.open) {
          this.set('open', true);
        }

        const windowClick = evt => {
          const isOl = e =>
            e.target.localName === 'ol' &&
            e.target.classList.contains('curtain-clab');
          const isLi = e =>
            e.target.localName === 'li' &&
            e.target.classList.contains('curtain-clab');

          if (isLi(evt)) {
            return window.removeEventListener('mousedown', windowClick);
          }

          if (isOl(evt) || isInput(evt)) {
            return;
          }

          this.set('open', false);
          this.set('_currentHint', undefined);
          this.set('_inputString', '');
          this.results = [];
          return window.removeEventListener('mousedown', windowClick);
        };

        if (!this.open) {
          this.set('_currentHint', undefined);
          this.set('_inputString', '');
          this.results = [];
        }
        return window.addEventListener('mousedown', windowClick);
      }
    };
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
    })
      .then(res => {
        if (res.status !== 200) {
          this.type = 'error';
          this._resetSpinnerTimeout();
          return;
        }

        res.json().then(data => {
          this.set('options', data);
          if (this.type === 'error') {
            this.type = '';
          }
          this.async(() => {
            this._showHints(this.filter);
            this._resetSpinnerTimeout();
          }, 50);
        });
      })
      .catch(err => {
        console.error('Fetch Error ==> ', err);
        this.type = 'error';
        this._resetSpinnerTimeout();
      });
  }

  _showHints(filter) {
    this.set(
      'results',
      filterOptions(filter, this._inputString, this.labelField, this.options)
    );
    this._handleListVisual();
  }

  _handleListVisual() {
    if (this.results.length > 0) {
      this._currentHint = this.results[0];
      this.querySelector('curtain-clab').open = true;
    } else {
      this.querySelector('curtain-clab').open = false;
      this._currentHint = undefined;
    }
  }

  _handleArrows(type) {
    const HIdx = getIndex(this._currentHint, this.results);
    let item;
    switch (type) {
      case 'up':
        item = this.results[HIdx - 1];
        if (
          item !== null &&
          typeof item === 'object' &&
          item.constructor === Object
        ) {
          this._currentHint = item;
          this.querySelector('curtain-clab').scrollToHighlight(HIdx - 1, true);
        }
        break;
      case 'down':
        item = this.results[HIdx + 1];
        if (
          item !== null &&
          typeof item === 'object' &&
          item.constructor === Object
        ) {
          this._currentHint = item;
          this.querySelector('curtain-clab').scrollToHighlight(HIdx + 1, false);
        }
        break;
      default:
        break;
    }
  }

  /*----------
  OBSERVERS
  ----------*/
  _setOptions(promise) {
    promise().then(resp => {
      this.set('options', resp);
    });
  }

  _changedSelected(val, old) {
    if (typeof val !== 'undefined' && Object.keys(val).length > 0) {
      this._inputString = this.selected[this.labelField];
      this._currentHint = undefined;

      if (this.resultAsObj) {
        this.dispatchEvent(
          new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
              selected: this.selected,
              value: this.selected
            }
          })
        );
      } else {
        this.dispatchEvent(
          new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
              selected: this.selected.label,
              value: this.selected.label
            }
          })
        );
      }
    }
  }

  /*----------
  UTILS
  ----------*/
  _startSpinnerTimeout() {
    this._interval = window.setTimeout(() => {
      if (!this._spinner) {
        this._spinner = true;
      }
    }, 400);
  }

  _resetSpinnerTimeout() {
    window.clearTimeout(this._interval);
    this._interval = undefined;
    if (this._spinner) {
      this._spinner = false;
    }
  }

  _setLabelSize(newSize) {
    this.set('labelSize', newSize);
  }

  /*----------
  PUBLIC
  ----------*/
  setSelected(obj) {
    this.set('open', false);
    this.set('selected', obj);
    this.set('_inputString', '');
    this.set('_currentHint', undefined);
    this.results = [];
  }
}

Polymer(AutoCompleteClab);
