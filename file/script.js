'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FileClab = (function () {
	function FileClab() {
		_classCallCheck(this, FileClab);
	}

	_createClass(FileClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "file-clab";
			this.properties = {
				label: {
					type: String
				},
				name: {
					type: String,
					value: 'textinput'
				},
				value: {
					type: String
				},
				multiple: {
					type: Boolean,
					value: false
				},
				note: {
					type: String
				},
				noteType: {
					type: String,
					value: ''
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			var fileInput = this.querySelector('input[type="file"]');
			var textInput = this.querySelector('input[type="text"]');

			fileInput.addEventListener('change', function (evt) {
				var arr = [];
				Array.from(fileInput.files).forEach(function (file) {
					arr.push(file.name);
				});
				/*for (var i = 0; i < file.files.length; i++) {
    	arr.push(file.files[i].name);
    }*/
				textInput.value = arr.join(', ').replace("C:\\fakepath\\", "");
				_this.value = textInput.value;
			});
		}
	}, {
		key: '_selection',
		value: function _selection(evt) {
			this.querySelector('input[type="file"]').click();
		}
	}, {
		key: '_dashify',
		value: function _dashify(label) {
			var str = label.replace(' ', '-');
			return str.toLowerCase();
		}
	}, {
		key: '_viewLabel',
		value: function _viewLabel(label) {
			if (label.length > 0) return true;else return false;
		}
	}]);

	return FileClab;
})();

Polymer(FileClab);