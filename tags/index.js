'use strict';

import './view.html';
import {UtilBehavior} from "./../_behaviors/behaviors.es6";
import "./../button";
import "./../label-badge";
import "./../input/";

class TagsClab extends Polymer.Element {
        
  static get is() { return 'tags-clab'; }

  get behaviors() {
    return [UtilBehavior];
  }

  static get properties() {
    return {
      label: String,
      name: {
        type: String,
        value: 'tags input'
      },
      inputString: String,
      type: {
        type: String,
        value: ''
      },
      noteType: {
        type: String
      },
      disabled: {
        type: Boolean,
        value: false
      },
      placeholder: String,
      stacked: {
        type: Boolean,
        value: false
      },
      tags: {
        type: Array,
        value: [],
        notify: true
      },
      btnLabel: {
        type: String,
        value: 'Add'
      },
      btnAppearence: String,
      btnSize: String,
      btnIcon: String,
      hideInput: {
        type: Boolean,
        value: false
      }
    }
  }


  /*----------
  EVENT HANDLERS
  ----------*/
  _handleKeyUp(evt) {
    evt.preventDefault();
    switch(evt.keyCode) {
      case 188:
        // if comma
        this._addTag(evt);
        break;
      case 13:
        // if enter
        const elem = this.querySelector('button-clab');
        elem.dispatchEvent(new CustomEvent('btnclick'), {bubbles: true});
        break;
    }
  }

  _addTag(evt) {
    let str = this.inputString == undefined ? '' : this.inputString.split(',')[0];
    if(!/\S/.test(str)) return;
    let newTag = {
      label: str,
      value: str
    };
    this.push('tags', newTag);
    this.inputString = '';

    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        tags: this.tags,
        new: newTag
      }
    }));
  }

  _removeTag(evt) {
    let value = evt.target.getAttribute('value');
    let i = parseInt(evt.currentTarget.dataset.index);
    this.tags.map((tag, idx) => {
      if(tag.value === value) {
        i = idx;
        return;
      }
    });
    if(i != undefined) this.splice('tags', i, 1);

    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        tags: this.tags,
        removed: i
      }
    }));
  }

  _computeStacked(stacked) {
    if(stacked) {
      return 'selected-values';
    } else {
      return '';
    }
  }


  /*----------
  PUBLIC
  ----------*/
  setTags(array) {
    if(this.tags.length < 0) {
      this.set('tags', array);
    } else {
      array.map(item => {
        this.push('tags', item);
      });
    }
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        tags: this.tags,
        new: array
      }
    }));

    return this.tags;
  }

}


customElements.define(TagsClab.is, TagsClab);
