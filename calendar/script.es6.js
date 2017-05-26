'use strict';

import rome from 'rome';
import moment from 'moment';
import {
  Polymer
} from "./../_assets/js/polymer";
import {
  UtilBehavior
} from "./../_behaviors/behaviors.es6";
import {
  NoteClab
} from "./../note/script.es6";

export class CalendarClab {

  get behaviors() {
    return [UtilBehavior];
  }

  beforeRegister() {
    this.is = "calendar-clab";
    this.properties = {
      label: String,
      disabled: {
        type: Boolean,
        value: false
      },
      valueStr: {
        type: String,
        value: null,
        notify: true
      },
      inline: {
        type: Boolean,
        value: false
      },
      options: {
        type: Object,
        value: {}
      },
      placeholder: String,
      type: String,
      noteType: String
    }
  }

  attached() {
    setTimeout(() => {
      this.inline ? this._createInstance('div.inline-cal') : this._createInstance("input");
    }, 50);
  }

  detached() {
    const calendar = rome.find(this.querySelector('input'));
    calendar ? calendar.destroy() : null;
  }




  /*----------
  EVENT HANDLERS
  ----------*/
  _checkClear(evt) {
    const newDate = evt.target.value;
    if (newDate === this.valueStr) return;

    if (evt.keyCode === 13) {
      if (newDate !== "") {
        this.valueStr = newDate;

        this.dispatchEvent(new CustomEvent('datechange', {
          bubbles: true,
          composed: true,
          detail: {
            date: newDate,
            dateISO: moment(new Date(newDate)).format()
          }
        }));
      }
      this.getRomeInstance().hide();
    }

    if (newDate === "" && this.valueStr !== null) {
      this.clear();
      this.dispatchEvent(new CustomEvent('datechange', {
        bubbles: true,
        composed: true,
        detail: {
          date: undefined,
          dateISO: undefined
        }
      }));
    }
  }

  _focusElement(evt) {
    if (!this.disabled) {
      evt.stopPropagation();
      this.getRomeInstance().show();
    }
  }



  /*----------
  METHODS
  ----------*/
  _createInstance(selector) {
    this.setLocale();
    const obj = typeof this.options === 'object' ? this.options : this.getRomeInstance().options();
    const currentCalendar = this.$$(selector);
    const cal = rome(currentCalendar, obj);

    cal.on('data', this._changeDate.bind(this))
    cal.on('next', evt => {
      this.cancelAsync(this._fireDate);
    })
    cal.on('back', evt => {
      this.cancelAsync(this._fireDate);
    })

    this.dispatchEvent(new CustomEvent('instance-created', {
      bubbles: true,
      composed: true,
      detail: currentCalendar,
    }));
  }

  _changeDate(newDate) {
    if (newDate === this.valueStr) return;

    this.cancelAsync(this._fireDate);
    this._fireDate = this.async(() => {
      this.valueStr = newDate;
      this.dispatchEvent(new CustomEvent('datechange', {
        bubbles: true,
        composed: true,
        detail: {
          date: newDate,
          dateISO: moment(new Date(newDate)).format()
        }
      }));
    }, 250);
  }



  /*----------
  COMPUTED
  ----------*/
  _computeType(str, type) {
    return [str, type].join(' ');
  }




  /*----------
  UTILS
  ----------*/
  _getFormat() {
    let thisFormat = this.options.inputFormat ? this.options.inputFormat : this.getRomeInstance().options().inputFormat;
    return thisFormat;
  }

  _getLocale() {
    let thisLocale = this.options.locale ? this.options.locale : 'en';
    return thisLocale;
  }



  /*----------
  PUBLIC METHODS
  ----------*/
  setValue(userValue) {
    this.valueStr = moment(userValue).format(this._getFormat());
  }

  getValue() {
    let formatted = moment(this.valueStr, this._getFormat()).format();
    return this.valueStr ? formatted : undefined;
  }

  setLocale() {
    let thisLocale = this._getLocale();
    rome.moment.locale(thisLocale);
  }

  getLocale() {
    return rome.moment.locale();
  }

  getRomeInstance() {
    return rome.find(this.querySelector('input'));
  }

  restore() {
    const selector = this.inline ? 'div.inline-cal' : 'input';
    const currentCalendar = this.$$(selector);
    rome(currentCalendar).restore(this.options);
    return currentCalendar;
  }

  clear() {
    this.value = '';
    this.valueStr = null;
    let rome = this.getRomeInstance();
    rome.setValue(moment().format());
  }

}


Polymer(CalendarClab);
