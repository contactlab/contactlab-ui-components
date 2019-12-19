import rome from 'rome';
import moment from 'moment';
import props from './props';
import {dashify, viewLabel} from '../_libs/utils';
import {getLocale} from './methods/public';
import {_computeType, _getLocale, _getFormat} from './methods/internal';
import './view.html';
import '../note/';

class CalendarClab {
  get behaviors() {
    return [{dashify, viewLabel, getLocale, _computeType}];
  }

  beforeRegister() {
    this.is = 'calendar-clab';
    this.properties = props;
  }

  attached() {
    setTimeout(() => {
      this.inline
        ? this._createInstance('div.inline-cal')
        : this._createInstance('input');
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
      if (newDate !== '') {
        this.valueStr = newDate;

        this.dispatchEvent(
          new CustomEvent('datechange', {
            bubbles: true,
            composed: true,
            detail: {
              date: newDate,
              dateISO: moment(new Date(newDate)).format()
            }
          })
        );
      }
      this.getRomeInstance().hide();
    }

    if (newDate === '' && this.valueStr !== null) {
      this.clear();
      this.dispatchEvent(
        new CustomEvent('datechange', {
          bubbles: true,
          composed: true,
          detail: {
            date: undefined,
            dateISO: undefined
          }
        })
      );
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
    const obj =
      typeof this.options === 'object'
        ? this.options
        : this.getRomeInstance().options();
    const currentCalendar = this.$$(selector);
    const cal = rome(currentCalendar, obj);

    cal.on('data', this._changeDate.bind(this));
    cal.on('next', evt => {
      this.cancelAsync(this._fireDate);
    });
    cal.on('back', evt => {
      this.cancelAsync(this._fireDate);
    });

    this.dispatchEvent(
      new CustomEvent('instance-created', {
        bubbles: true,
        composed: true,
        detail: currentCalendar
      })
    );
  }

  _changeDate(newDate) {
    if (newDate === this.valueStr) return;

    this.cancelAsync(this._fireDate);
    this._fireDate = this.async(() => {
      this.valueStr = newDate;
      this.dispatchEvent(
        new CustomEvent('datechange', {
          bubbles: true,
          composed: true,
          detail: {
            date: newDate,
            dateISO: moment(new Date(newDate)).format()
          }
        })
      );
    }, 250);
  }

  /*----------
  PUBLIC METHODS
  ----------*/
  setValue(userValue) {
    const format = _getFormat(this.options, this.getRomeInstance());
    this.valueStr = moment(userValue).format(format);
  }

  getValue() {
    const format = _getFormat(this.options, this.getRomeInstance());
    const formatted = moment(this.valueStr, format).format();
    return this.valueStr ? formatted : undefined;
  }

  setLocale() {
    let thisLocale = _getLocale(this.options);
    rome.moment.locale(thisLocale);
  }

  getRomeInstance() {
    return rome.find(this.querySelector('input'));
  }

  restore(options) {
    const selector = this.inline ? 'div.inline-cal' : 'input';
    const currentCalendar = this.$$(selector);
    rome(currentCalendar).destroy();
    rome(currentCalendar).restore(options || this.options);
    return currentCalendar;
  }

  clear() {
    this.set('valueStr', null);
    this.getRomeInstance().setValue(moment().format());
  }
}

Polymer(CalendarClab);
