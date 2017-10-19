'use strict';

import { dashify, viewLabel } from './../_libs/utils';
import props from './props';
import './view.html';
import "./../button/";
import "./../note/";

class InputClab {

  get behaviors() {
    return [{ dashify, viewLabel }];
  }

  beforeRegister() {
    this.is = "input-clab";
    this.properties = props;
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
    const arr = [str];
    if (type !== null) arr.push(type);
    if (inline) {
      arr.push('inline');
      if (labelSize != null) arr.push(labelSize + '-label');
    }
    return arr.join(' ');
  }

  _compClassType(type, disabled){
    const arr = [];
    disabled ? arr.push('disabled') : null;
    type !== 'disabled' ? arr.push(type) : null;
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
