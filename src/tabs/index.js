import props from './props';
import './view.html';

export class TabsClab {
  beforeRegister() {
    this.is = 'tabs-clab';
    this.properties = props;
    this.observers = ['_changeTab(active, _content)'];
  }

  attached() {
    this._content = this.getEffectiveChildren();
  }

  _activateThis(evt) {
    evt ? evt.preventDefault() : null;
    this.active = parseInt(
      evt.currentTarget.parentNode.getAttribute('data-index')
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          active: this.active
        }
      })
    );
  }

  _changeTab(active, content) {
    if (active != undefined) {
      if (content != undefined && content.length > 0) {
        while (Polymer.dom(this.$.activeContentWrapper).firstChild) {
          Polymer.dom(this.$.activeContentWrapper).removeChild(
            Polymer.dom(this.$.activeContentWrapper).firstChild
          );
        }
        Array.prototype.map.call(this._content, (node, i) => {
          if (i == active) {
            Polymer.dom(this.$.activeContentWrapper).appendChild(node);
            Polymer.dom.flush();
            return;
          }
        });
      }
    }
  }

  _computeType(pills, vertical, centered, bordered) {
    let arr = [];
    pills ? arr.push('pills') : arr.push('tabs');
    if (vertical) arr.push('vertical');
    if (centered) arr.push('centered');
    if (bordered) arr.push('bordered');
    return arr.join(' ');
  }

  _computeActive(active, index) {
    let arr = ['tab'];
    if (active === index) {
      arr.push('active');
      this.set('current', this.labels[active]);
    }
    return arr.join(' ');
  }
}

Polymer(TabsClab);
