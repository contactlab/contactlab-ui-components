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
				reduceText: {
					type: String,
					value: 'Riduci menu'
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
					value: []
				}
			};
		}
	}, {
		key: 'attached',
		value: function attached() {
			var _this = this;

			this._iosMenu();

			setTimeout(function () {
				Array.from(_this.querySelectorAll('.first-level-menu>li>a')).forEach(function (e, i) {
					if (location.hash.search(e.getAttribute('href')) > -1) {
						e.parentNode.classList.add('active');
					} else {
						e.parentNode.classList.remove('active');
					}
				});

				Array.from(_this.querySelectorAll('.second-level-menu>li>a')).forEach(function (e, i) {
					if (location.hash.search(e.getAttribute('href')) > -1) {
						e.parentNode.classList.add('active');
					} else {
						e.parentNode.classList.remove('active');
					}
				});
			}, 10);
		}
	}, {
		key: '_openItem',
		value: function _openItem(evt) {
			var selector = this.querySelectorAll('.first-level-menu>li>a, menu-clab .second-level-menu>li>a');
			Array.from(selector).forEach(function (e, i) {
				if (location.hash.search(e.getAttribute('href')) > -1) {
					e.parentNode.classList.add('active');
				} else {
					e.parentNode.classList.remove('active');
				}
			});
			Array.from(this.querySelectorAll('.first-level-menu>li')).forEach(function (e, i) {
				e.classList.remove('open');
			});
			if (evt.currentTarget.nextElementSibling.tagName === 'UL') {
				evt.preventDefault();
				evt.currentTarget.parentNode.classList.add('open');
				Array.from(selector).forEach(function (e, i) {
					e.parentNode.classList.remove('active');
				});
				evt.currentTarget.parentNode.classList.add('active');
			}
		}
	}, {
		key: '_activeItem',
		value: function _activeItem(evt) {
			Array.from(this.querySelectorAll('.second-level-menu>li>a')).forEach(function (e, i) {
				e.parentNode.classList.remove('active');
			});
			evt.currentTarget.parentNode.classList.add('active');
		}
	}, {
		key: '_iosMenu',
		value: function _iosMenu() {
			var _this2 = this;

			document.querySelector('body main').addEventListener('click', function (evt) {
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
						Array.from(_this2.querySelectorAll('.first-level-menu>li')).forEach(function (e, i) {
							e.classList.remove('open');
						});
						break;
				}
			});
		}
	}, {
		key: '_reduce',
		value: function _reduce() {
			document.body.classList.toggle('main-sidebar-small');
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