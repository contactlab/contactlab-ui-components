'use strict';

import rome from 'rome';
import moment from 'moment';
import {Polymer} from "./../_assets/js/polymer";
import {UtilBehavior} from "./../_behaviors/behaviors.es6";
import {NoteClab} from "./../note/script.es6";

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

  detached(){
    const calendar = rome.find(this.querySelector('input'));
    calendar ? calendar.destroy() : null;
  }




  /*----------
  EVENT HANDLERS
  ----------*/
  _checkClear(evt) {
    if(evt.target.value == "") {
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
    if(!this.disabled) {
      evt.stopPropagation();
      console.log(this.getRomeInstance());
      this.getRomeInstance().show();
    }
  }



  /*----------
  METHODS
  ----------*/
  _createInstance(selector) {
    this.setLocale();
    const obj = typeof this.options == 'object' ? this.options : this.getRomeInstance().options();
    const currentCalendar = this.$$(selector);
    rome(currentCalendar, obj)
      .on('data', this._changeDate.bind(this));
    this.dispatchEvent(new CustomEvent('instance-created', {
      bubbles: true,
      composed: true,
      detail: currentCalendar,
    }));
  }

  _changeDate(evt) {
    this.valueStr = evt;
    this.dispatchEvent(new CustomEvent('datechange', {
      bubbles: true,
      composed: true,
      detail: {
        date: evt,
        dateISO: moment(new Date(evt)).format()
      }
    }));
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
