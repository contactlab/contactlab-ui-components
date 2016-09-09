'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagsClab = function () {
	function TagsClab() {
		_classCallCheck(this, TagsClab);
	}

	_createClass(TagsClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = "tags-clab";
			this.properties = {
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
			};
		}

		/*----------
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_handleKeyUp',
		value: function _handleKeyUp(evt) {
			switch (evt.keyCode) {
				case 188:
					// if comma
					this._addTag(evt);
					break;
				case 13:
					// if enter
					this.querySelector('button-clab').fire('btnclick');
					break;
			}
		}
	}, {
		key: '_addTag',
		value: function _addTag(evt) {
			var str = this.inputString == undefined ? '' : this.inputString.split(',')[0];
			if (!/\S/.test(str)) return;
			var newTag = {
				label: str,
				value: str
			};
			this.push('tags', newTag);
			this.inputString = '';

			this.fire('change', { 'tags': this.tags, 'new': newTag });
		}
	}, {
		key: '_removeTag',
		value: function _removeTag(evt) {
			var value = evt.target.getAttribute('value');
			var i = parseInt(evt.currentTarget.dataset.index);
			this.tags.map(function (tag, idx) {
				if (tag.value === value) {
					i = idx;
					return;
				}
			});
			if (i != undefined) this.splice('tags', i, 1);

			this.fire('change', { 'tags': this.tags, 'removed': i });
		}
	}, {
		key: '_computeStacked',
		value: function _computeStacked(stacked) {
			if (stacked) {
				return 'selected-values';
			} else {
				return '';
			}
		}

		/*----------
  PUBLIC
  ----------*/

	}, {
		key: 'setTags',
		value: function setTags(array) {
			var _this = this;

			if (this.tags.length < 0) {
				this.set('tags', array);
			} else {
				array.map(function (item) {
					_this.push('tags', item);
				});
			}
			this.fire('change', { 'tags': this.tags, 'new': array });

			return this.tags;
		}
	}, {
		key: 'behaviors',
		get: function get() {
			return [UtilBehavior];
		}
	}]);

	return TagsClab;
}();

Polymer(TagsClab);