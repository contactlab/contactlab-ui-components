'use strict';

import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { LegacyElementMixin } from '@polymer/polymer/lib/legacy/legacy-element-mixin';
import template from './view.html';
import props from './props';
import { dashify, viewLabel } from './../_libs/utils';
import '@polymer/polymer/lib/elements/dom-if';
import "./../button";
import "./../note";

class InputClab extends mixinBehaviors([{ dashify, viewLabel }, LegacyElementMixin], PolymerElement)  {

  static get is() { return 'input-clab'; }

  static get template() { return template; }

  static get properties() { return props; }


  connectedCallback() {
    super.connectedCallback();

    this.getEffectiveChildren().forEach((node,i) => {
      if (node.classList.contains('note')) {
        this.$$('note-clab').appendChild(node);
        /* Polymer.dom(this.$$('note-clab')).appendChild(node);
        Polymer.dom.flush(); */
      }
    })
  }


  /*----------
  EVENT HANDLERS
  ----------*/
  _toggleInputType(evt) {
    this.password = !this.password;
  }

  _btnclick(evt) {
    this.dispatchEvent(new CustomEvent('btnclick',{
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
    if(newVal) this.type = 'disabled';
  }



  /*----------
  COMPUTE
  ----------*/
  _compWrapperClass(str, type, inline, labelSize) {
    let arr = [str];
    if(type != null) arr.push(type);
    if(inline) {
      arr.push('inline');
      if(labelSize != null) arr.push(labelSize + '-label');
    }
    return arr.join(' ');
  }

  _compIcon(icon) {
    if(icon != undefined) return 'clab-icon ' + icon;
    else return '';
  }

  _computeInputType(password, inputType) {
    if(password) {
      return 'password';
    } if (inputType){
      return inputType;
    } else {
      return 'text';
    }
  }

  _computeBtnPswd(val, old) {
    if(val){
      this.set('_btnPswd', this.btnPswd.show);
    } else {
      this.set('_btnPswd', this.btnPswd.hide);
    }
  }

}


customElements.define(InputClab.is, InputClab);
