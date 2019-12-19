import {dashify, viewLabel} from '../_libs/utils';
import props from './props';
import './view.html';

class FileClab {
  get behaviors() {
    return [{dashify, viewLabel}];
  }

  beforeRegister() {
    this.is = 'file-clab';
    this.properties = props;
  }

  _selection(evt) {
    this.querySelector('input[type=file]').click();
  }

  _updateValue(evt) {
    let files = evt.target.files;
    let arr = [];

    let readFiles = file => {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        arr.push(file.name);

        let reader = new FileReader();
        reader.addEventListener(
          'loadend',
          () => {
            var image = new Image();
            image.height = 100;
            image.title = file.name;
            image.src = reader.result;
            // console.log(image);
            if (!this.noPreview) {
              this.$.preview.innerHTML = '';
              this.$.preview.appendChild(image);
            }
          },
          false
        );
        reader.readAsDataURL(file);
      }
    };

    Array.prototype.map.call(files, readFiles);
    this.set('value', arr.join(', '));
  }

  _checkIfResetPreview(evt) {
    if (evt.target.value == '') this.$.preview.innerHTML = '';
  }

  _disabledChanged(newVal, oldVal) {
    if (newVal) this.type = 'disabled';
  }

  _compWrapperClass(str, type) {
    let arr = [str];
    if (type != null) arr.push(type);
    return arr.join(' ');
  }

  resetPreview() {
    this.$.preview.innerHTML = '';
  }
}

Polymer(FileClab);
