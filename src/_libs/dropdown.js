'use strict';

/**
 *
 * Dropdown common utilities.
 * @module _libs/dropdown
 */


const getSelectedLabel = () => {
  return this.selected[this.labelField];
}

const getSelectedValue = () => {
  return this.selected[this.valueField];
}

const setByLabel = (str) => {
  this.options.map(opt => {
    if (opt[this.labelField] === str) {
      this._setSelected(opt);
      return;
    }
  });
}

const setByValue = (str) => {
  this.options.map(opt => {
    if (opt[this.valueField] === str) {
      this._setSelected(opt);
      return;
    }
  });
}

const isValorized = () => {
  return !this.isNotValorized();
}

const isNotValorized = () => {
  return  this.selected === undefined ||
          this.selected === null ||
          this.selected[this.valueField] === undefined ||
          this.selected[this.valueField] === null;
}

const setValue = (obj, prevent) => {
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

const getValue = () => {
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

const getValueObject = () => {
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

export {}
