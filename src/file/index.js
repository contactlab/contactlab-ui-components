'use strict';

import { PolymerElement } from '@polymer/polymer/polymer-element';
import template from './view.html';
import props from './props';
import { dashify, viewLabel } from './../_libs/utils';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/polymer/lib/elements/dom-if';

class FileClab extends mixinBehaviors([{ dashify, viewLabel }], PolymerElement)  {

  static get is() { return 'file-clab'; }

  static get template() { return template; }

  static get properties() { return props; }


  /*----------
  EVENT HANDLERS
  ----------*/
  _selection(evt) {
    this.$.input_file.click();
  }

  _updateValue(evt) {
    let files = evt.target.files;
    let arr = [];

    let readFiles = (file) => {
      if(/\.(jpe?g|png|gif)$/i.test(file.name)) {
        arr.push(file.name);

        let reader = new FileReader();
        reader.addEventListener("loadend", () => {
          var image = new Image();
          image.height = 100;
          image.title = file.name;
          image.src = reader.result;
          // console.log(image);
          if(!this.noPreview) {
            this.$.preview.innerHTML = '';
            this.$.preview.appendChild(image);
          }
        }, false);
        reader.readAsDataURL(file);
      }
    }

    Array.prototype.map.call(files, readFiles);
    this.set('value', arr.join(', '));
  }

  _checkIfResetPreview(evt) {
    if(evt.target.value == '') this.$.preview.innerHTML = '';
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
  _compWrapperClass(str, type) {
    let arr = [str];
    if(type != null) arr.push(type);
    return arr.join(' ');
  }


  /*----------
  PUBLIC
  ----------*/
  resetPreview() {
    this.$.preview.innerHTML = '';
  }

}



customElements.define(FileClab.is, FileClab);
