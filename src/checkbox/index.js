'use strict';

import { PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import template from './view.html';
import props from './props';
import { dashify } from './../_libs/utils';

class CheckboxClab extends mixinBehaviors([{ dashify }], PolymerElement) {

  static get is() { return 'checkbox-clab'; }

  static get template() { return template; }

  static get properties() { return props; }


  /***
   *     _     _  __
   *    | |   (_)/ _|
   *    | |    _| |_ ___
   *    | |   | |  _/ _ \
   *    | |___| | ||  __/
   *    \_____/_|_| \___|
   *
   *
   */

  connectedCallback() {
    super.connectedCallback();
    if (typeof label === 'undefined') {
      console.warn('WARNING <checkbox-clab>: "label" not specified');
      return false;
    }
  }


  /***
   *    ___  ___     _   _               _
   *    |  \/  |    | | | |             | |
   *    | .  . | ___| |_| |__   ___   __| |___
   *    | |\/| |/ _ \ __| '_ \ / _ \ / _` / __|
   *    | |  | |  __/ |_| | | | (_) | (_| \__ \
   *    \_|  |_/\___|\__|_| |_|\___/ \__,_|___/
   *
   *
   */

  /**
   * Toggle checked or not of the checkbox
   */
  toggleActive() {
    this.set('active', !this.active)
    return new Promise(resolve => resolve(true))
  }

  /***
   *    ______     _            _
   *    | ___ \   (_)          | |
   *    | |_/ / __ ___   ____ _| |_ ___  ___
   *    |  __/ '__| \ \ / / _` | __/ _ \/ __|
   *    | |  | |  | |\ V / (_| | ||  __/\__ \
   *    \_|  |_|  |_| \_/ \__,_|\__\___||___/
   *
   *
   */


  /***
   *     _     _     _
   *    | |   (_)   | |
   *    | |    _ ___| |_ ___ _ __   ___ _ __ ___
   *    | |   | / __| __/ _ \ '_ \ / _ \ '__/ __|
   *    | |___| \__ \ ||  __/ | | |  __/ |  \__ \
   *    \_____/_|___/\__\___|_| |_|\___|_|  |___/
   *
   *
   */

  _onChange(evt) {
    this.toggleActive().then(res => {
      this.dispatchEvent(new CustomEvent('selected-change',{
        bubbles: true,
        composed: true
      }))
    })
  }

  /***
   *     _____                             _
   *    /  __ \                           | |
   *    | /  \/ ___  _ __ ___  _ __  _   _| |_ ___ _ __ ___
   *    | |    / _ \| '_ ` _ \| '_ \| | | | __/ _ \ '__/ __|
   *    | \__/\ (_) | | | | | | |_) | |_| | ||  __/ |  \__ \
   *     \____/\___/|_| |_| |_| .__/ \__,_|\__\___|_|  |___/
   *                          | |
   *                          |_|
   */

  /**
   * Compute style of the wrapper
   */
  _computeType(type) {
    return ['row', type].join(' ');
  }

}


customElements.define(CheckboxClab.is, CheckboxClab);
