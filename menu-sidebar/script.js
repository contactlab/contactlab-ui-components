'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuClab = (function () {
	function MenuClab() {
		_classCallCheck(this, MenuClab);
	}

	_createClass(MenuClab, [{
		key: 'beforeRegister',
		value: function beforeRegister() {
			this.is = 'menu-clab';
			this.properties = {
				title: {
					type: String,
					value: 'Title'
				},
				titleIcon: {
					type: String,
					value: 'fa-hand-peace-o'
				},
				reduceOpen: {
					type: String,
					value: 'clab clab-icon-expand expand'
				},
				reduceClose: {
					type: String,
					value: 'clab clab-icon-resize compress'
				},
				menu: {
					type: Array,
					value: [],
					observer: '_addOpenAttr'
				},
				link: {
					type: String,
					value: '/'
				},
				_url: {
					type: String
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this._url = location.hash;

			window.addEventListener('hashchange', function (evt) {
				_this._url = location.hash;
			});

			this._iosMenu();
		}

		/*---------- 
  EVENT HANDLERS
  ----------*/

	}, {
		key: '_openItem',
		value: function _openItem(evt) {
			var i = parseInt(evt.currentTarget.dataset.index);
			var str = 'menu.' + i + '.open';
			if (this.menu[i].submenu) {
				this._url = this.menu[i].url;
				evt.preventDefault();
				this.set(str, true);
			} else {
				this._url = location.hash;
				this._addOpenAttr();
				this.set(str, false);
			}
		}
	}, {
		key: '_reduce',
		value: function _reduce(evt) {
			document.body.classList.toggle('main-sidebar-small');
		}

		/*---------- 
  METHODS
  ----------*/

	}, {
		key: '_iosMenu',
		value: function _iosMenu() {
			var _this2 = this;

			document.querySelector('body').addEventListener('click', function (evt) {
				switch (evt.target.nodeName) {
					case 'INPUT':
					case 'BUTTON':
					case 'TEXTAREA':
					case 'LABEL':
					case 'SELECT':
						return true;
						break;
					default:
						_this2.$$('#logo a').focus();
						break;
				}
			});
		}

		/*---------- 
  OBSERVERS
  ----------*/

	}, {
		key: '_addOpenAttr',
		value: function _addOpenAttr() {
			var _this3 = this;

			this.menu.map(function (e, i) {
				_this3.set('menu.' + i + '.open', false);
			});
		}

		/*---------- 
  COMPUTE
  ----------*/

	}, {
		key: '_computeActive',
		value: function _computeActive(url, link, open) {
			var arr = [];
			open ? arr.push('open', 'active') : null;
			url.search(link) > -1 ? arr.push('active') : null;
			return arr.join(' ');
		}
	}, {
		key: '_computeTitleIcon',
		value: function _computeTitleIcon(icon) {
			return ['clab', icon].join(' ');
		}
	}, {
		key: '_computeReduceIcons',
		value: function _computeReduceIcons(classes) {
			return classes;
		}
	}]);

	return MenuClab;
})();

Polymer(MenuClab);