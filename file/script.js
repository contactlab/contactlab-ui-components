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
				label: {
					type: String
				},
				name: {
					type: String,
					value: 'fileinput'
				},
				type: {
					type: String,
					value: ''
				},
				value: {
					type: String,
					value: null
				},
				disabled: {
					type: Boolean,
					value: false,
					notify: true,
					reflectToAttribute: true,
					observer: 'disabledChanged'
				},
				multiple: {
					type: Boolean,
					value: false
				},
				noteType: {
					type: String,
					value: ''
				},

				compNoteType: {
					type: String,
					computed: 'computeNoteType(type, noteType)'
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
				Array.prototype.map.call(fileInput.files, function (file) {
					arr.push(file.name);
				});
				textInput.value = arr.join(', ').replace("C:\\fakepath\\", "");
				_this.value = textInput.value;
			});
		}

		/*---------- 
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_selection',
		value: function _selection(evt) {
			this.querySelector('input[type=file]').click();
		}

		/*---------- 
  OBSERVERS
  ----------*/

	}, {
		key: 'disabledChanged',
		value: function disabledChanged(newVal, oldVal) {
			if (newVal) this.type = 'disabled';
		}

		/*---------- 
  COMPUTE
  ----------*/

	}, {
		key: 'computeNoteType',
		value: function computeNoteType(type, noteType) {
			return [type, noteType].join(' ');
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