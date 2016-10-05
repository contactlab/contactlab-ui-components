'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileClab = function () {
  function FileClab() {
    _classCallCheck(this, FileClab);
  }

  _createClass(FileClab, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = "file-clab";
      this.properties = {
        label: String,
        name: {
          type: String,
          value: 'fileinput'
        },
        type: {
          type: String,
          value: null
        },
        noteType: String,
        value: {
          type: String,
          notify: true,
          value: null
        },
        disabled: {
          type: Boolean,
          value: false,
          notify: true,
          reflectToAttribute: true,
          observer: '_disabledChanged'
        },
        multiple: {
          type: Boolean,
          value: false
        },
        noPreview: {
          type: Boolean,
          value: false
        }
      };
    }

    /*----------
    EVENT HANDLERS
    ----------*/

  }, {
    key: '_selection',
    value: function _selection(evt) {
      this.querySelector('input[type=file]').click();
    }
  }, {
    key: '_updateValue',
    value: function _updateValue(evt) {
      var _this = this;

      var files = evt.target.files;
      var arr = [];

      var readFiles = function readFiles(file) {
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          (function () {
            arr.push(file.name);

            var reader = new FileReader();
            reader.addEventListener("loadend", function () {
              var image = new Image();
              image.height = 100;
              image.title = file.name;
              image.src = reader.result;
              // console.log(image);
              if (!_this.noPreview) {
                _this.$.preview.innerHTML = '';
                _this.$.preview.appendChild(image);
              }
            }, false);
            reader.readAsDataURL(file);
          })();
        }
      };

      Array.prototype.map.call(files, readFiles);
      this.set('value', arr.join(', '));
    }
  }, {
    key: '_checkIfResetPreview',
    value: function _checkIfResetPreview(evt) {
      if (evt.target.value == '') this.$.preview.innerHTML = '';
    }

    /*----------
    OBSERVERS
    ----------*/

  }, {
    key: '_disabledChanged',
    value: function _disabledChanged(newVal, oldVal) {
      if (newVal) this.type = 'disabled';
    }

    /*----------
    COMPUTE
    ----------*/

  }, {
    key: '_compWrapperClass',
    value: function _compWrapperClass(str, type) {
      var arr = [str];
      if (type != null) arr.push(type);
      return arr.join(' ');
    }

    /*----------
    PUBLIC
    ----------*/

  }, {
    key: 'resetPreview',
    value: function resetPreview() {
      this.$.preview.innerHTML = '';
    }
  }, {
    key: 'behaviors',
    get: function get() {
      return [UtilBehavior];
    }
  }]);

  return FileClab;
}();

Polymer(FileClab);