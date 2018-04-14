'use strict';

import { PolymerElement } from '@polymer/polymer/polymer-element';
import template from './template.html';

class DemoElement extends PolymerElement {

  static get is() { return 'demo-element'; }

  static get template() { return template; }

  static get properties() {
    return {
      isAlive: {
        type: Boolean,
        value: true
      },
      tab1: {
        type: Number
      },
      tab2: {
        type: Number
      }
    }
  }

  test(){
    return Math.ceil(Math.random() * 100);
  }

  _updateTab1(evt){
    this.tab1 = evt.detail.active;
  }

  _updateTab2(evt) {
    this.tab2 = evt.detail.active;
  }

  connectedCallback(){
    super.connectedCallback();

    setTimeout(() => {
        // Dropdown in search mode
        const ddData = [{ "name": "ciccio", "value": "ciccio" }, { "name": "puzzo raga", "value": "puzzo raga" }, { "name": "bella", "value": "bella" }, { "name": "raga", "value": "raga" }, { "name": "tutto raga", "value": "tutto raga" }, { "name": "tutto rego", "value": "tutto rego" }]
        const ddSelected = Object.assign({}, ddData[2]);
        const ddsearch = this.$.ddsearch;

        setTimeout(() => {
          ddsearch.options = ddData;
        }, 1500)
        setTimeout(() => {
          ddsearch.selected = ddSelected;
        }, 700)


        // MODAL
        this.modal1 = this.$.modalOne;
        this.modal2 = this.$.modalTwo;
        this.modal1.addEventListener('modal-primary', function () {
          alert('Clicked');
        });
        this.modal1.addEventListener('modal-secondary', function (evt) {
          evt.target.hide();
        })
        this.modal2.addEventListener('modal-primary', function () {
          alert('Clicked');
        });
        this.modal2.addEventListener('modal-secondary', function (evt) {
          evt.target.hide();
        })
        this.modal2.addEventListener('modal-warning', function (evt) {
          if (this.modal2.primaryDisabled) this.modal2.primaryDisabled = false;
        }.bind(this))
        // Calendar
        this.$.cal.options = {
          time: false,
          inputFormat: "DD/MM/YYYY"
        };
        Array.prototype.map.call(document.querySelectorAll('autocomplete-clab'), function (el) {
          el.addEventListener('change', function (evt) {
            console.log('autocomplete-clab ', evt.detail)
          });
          el.addEventListener('sendRes', function (evt) {
            console.log('autocomplete-clab ', evt.detail)
          });
          el.addEventListener('typing', function (evt) {
            console.log('autocomplete-clab typing', evt)
          });
        });
        Array.prototype.map.call(document.querySelectorAll('dropdown-clab'), function (dropdown) {
          dropdown.addEventListener('change', function (evt) {
            console.log('dropdown-clab ', evt.detail)
          });
        });
        this.$.multi.addEventListener('change', function (evt) {
          console.log('multiple-clab ', evt.detail.selected)
        });
      }, 200);

      /*var menu = document.querySelector('menu-clab');
      menu.menu = [{
        "label": "Home",
        "url": "#/home",
        "visible": false
      }, {
        "label": "Plans",
        "url": "#/plans",
        "icon": "clab-icon icon-dashboard icon"
      }, {
        "label": "Segments",
        "url": "#/segments",
        "icon": "clab-icon icon-segment icon"
      }, {
        "label": "Reports",
        "url": "#/reports",
        "icon": "clab-icon icon-analytics icon"
      }, {
        "label": "Settings",
        "url": "#/settings",
        "icon": "clab-icon icon-settings icon",
        "submenu": [{
          "label": "Showed fields",
          "url": "#/settings/fields"
        }, {
          "label": "Time zones & week",
          "url": "#/settings/timezones"
        }, {
          "label": "Do Not Disturb Policy",
          "url": "#/settings/dnd"
        }, {
          "label": "Users",
          "url": "#/settings/users"
        }]
      }];*/
    }


    _openModal1() {
        this.modal1.show();
    }

    _openModal2() {
      this.modal2.show();
    }

    _notify(evt) {
      this.$.notify.visible = true;
    }

    _fire(evt) {
      console.log('primary');
    }

    _checkboxChange(evt) {
      console.log(evt.target);
    }

    _changeCurrentHash(evt) {
      this.set('currentHash', evt.detail.href);
    }

    _dateChange(evt){
      console.log(evt.detail)
    }

}

customElements.define('demo-element', DemoElement);
