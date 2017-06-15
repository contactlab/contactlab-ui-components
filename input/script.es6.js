'use strict';

import {
  Polymer
} from "./../_assets/js/polymer";
import {
  UtilBehavior
} from "./../_behaviors/behaviors.es6";
import {
  ButtonClab
} from "./../button/script.es6";
import {
  NoteClab
} from "./../note/script.es6";

export class InputClab {

  get behaviors() {
    return [UtilBehavior];
  }

  beforeRegister() {
    this.is = "input-clab";
    this.properties = {
      label: {
        type: String,
        value: null,
        reflectToAttribute: true
      },
      icon: {
        type: String,
        value: null,
        reflectToAttribute: true
      },
      name: {
        type: String,
        value: 'textinput',
        reflectToAttribute: true
      },
      inputType: {
        type: String,
        value: null,
        reflectToAttribute: true
      },
      type: {
        type: String,
        value: null,
        reflectToAttribute: true
      },
      noteType: String,
      value: {
        type: String,
        notify: true,
        reflectToAttribute: true
      },
      disabled: {
        type: Boolean,
        value: false,
        observer: '_disabledChanged',
        reflectToAttribute: true
      },
      inline: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      readonly: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      labelSize: {
        type: String,
        value: null
      },
      placeholder: {
        type: String,
        reflectToAttribute: true
      },
      check: {
        type: Boolean,
        value: false
      },
      required: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      maxlength: {
        type: Number,
        value: null,
        reflectToAttribute: true
      },
      btnPswd: {
        type: Object,
        value: {
          show: {
            icon: '',
            label: 'Show',
            type: "",
            appearance: "",
            size: ""
          },
          hide: {
            icon: '',
            label: 'Hide',
            type: "",
            appearance: "",
            size: ""
          }
        }
      },
      _btnPswd: Object,
      password: {
        type: Boolean,
        value: false,
        observer: '_computeBtnPswd'
      }
    }
  }


  /*----------
  EVENT HANDLERS
  ----------*/
  _toggleInputType(evt) {
    this.password = !this.password;
  }

  _btnclick(evt) {
    this.dispatchEvent(new CustomEvent('btnclick', {
      bubbles: true,
      composed: true
    }));
  }

  _blur(evt) {
    this.dispatchEvent(new CustomEvent('blur', {
      bubbles: true,
      composed: true,
      detail: {
        input: evt
      }
    }));
  }

  _focus(evt) {
    this.dispatchEvent(new CustomEvent('focus', {
      bubbles: true,
      composed: true,
      detail: {
        input: evt
      }
    }));
  }


  /*----------
  OBSERVERS
  ----------*/
  _disabledChanged(newVal, oldVal) {
    if (newVal) this.type = 'disabled';
  }



  /*----------
  COMPUTE
  ----------*/
  _compWrapperClass(str, type, inline, labelSize) {
    let arr = [str];
    if (type != null) arr.push(type);
    if (inline) {
      arr.push('inline');
      if (labelSize != null) arr.push(labelSize + '-label');
    }
    return arr.join(' ');
  }

  _compIcon(icon) {
    if (icon != undefined) return 'clab-icon ' + icon;
    else return '';
  }

  _computeInputType(password, inputType) {
    if (password) {
      return 'password';
    }
    if (inputType) {
      return inputType;
    } else {
      return 'text';
    }
  }

  _computeBtnPswd(val, old) {
    if (val) {
      this.set('_btnPswd', this.btnPswd.show);
    } else {
      this.set('_btnPswd', this.btnPswd.hide);
    }
  }

}


Polymer(InputClab);
