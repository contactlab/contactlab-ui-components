import './view.html';

Polymer({
  is: 'demo-elements',
  properties: {
    currentHash: {
      type: String,
      value: '#/plans'
    }
  },

  attached: function () {
    this.async(
      function () {
        // MODAL
        this.modal1 = document.querySelector('#modal-one');
        this.modal2 = document.querySelector('#modal-two');

        this.modal1.addEventListener('modal-primary', function () {
          alert('Clicked');
        });

        this.modal1.addEventListener('modal-secondary', function (evt) {
          evt.target.hide();
        });

        this.modal2.addEventListener('modal-primary', function () {
          alert('Clicked');
        });

        this.modal2.addEventListener('modal-secondary', function (evt) {
          evt.target.hide();
        });

        this.modal2.addEventListener(
          'modal-warning',
          function (evt) {
            if (this.modal2.primaryDisabled)
              this.modal2.primaryDisabled = false;
          }.bind(this)
        );

        // Calendar
        document.querySelector('calendar-clab').options = {
          time: false,
          inputFormat: 'DD/MM/YYYY'
        };

        Array.prototype.map.call(
          document.querySelectorAll('autocomplete-clab'),
          function (el) {
            el.addEventListener('change', function (evt) {
              console.log('autocomplete-clab ', evt.detail);
            });
            el.addEventListener('sendRes', function (evt) {
              console.log('autocomplete-clab ', evt.detail);
            });
            el.addEventListener('typing', function (evt) {
              console.log('autocomplete-clab typing', evt);
            });
          }
        );

        Array.prototype.map.call(
          document.querySelectorAll('dropdown-clab'),
          function (dropdown) {
            dropdown.addEventListener('change', function (evt) {
              console.log('dropdown-clab ', evt.detail);
            });
          }
        );

        document
          .querySelector('multiple-clab')
          .addEventListener('change', function (evt) {
            console.log('multiple-clab ', evt.detail.selected);
          });
      }.bind(this),
      200
    );

    var menu = document.querySelector('menu-clab');
    menu.menu = [
      {
        label: 'Home',
        url: '#/home',
        visible: false
      },
      {
        label: 'Plans',
        url: '#/plans',
        icon: 'fa fa-tachometer icon'
      },
      {
        label: 'Segments',
        url: '#/segments',
        icon: 'fa fa-users icon'
      },
      {
        label: 'Reports',
        url: '#/reports',
        icon: 'fa fa-bar-chart icon'
      },
      {
        label: 'Settings',
        url: '#/settings',
        icon: 'fa fa-cog icon',
        submenu: [
          {
            label: 'Showed fields',
            url: '#/settings/fields'
          },
          {
            label: 'Time zones & week',
            url: '#/settings/timezones'
          },
          {
            label: 'Do Not Disturb Policy',
            url: '#/settings/dnd'
          },
          {
            label: 'Users',
            url: '#/settings/users'
          }
        ]
      }
    ];
  },

  _openModal1: function () {
    this.modal1.show();
  },

  _openModal2: function () {
    this.modal2.show();
  },

  _notify: function (evt) {
    this.querySelector('#notify').visible = true;
  },

  _fire: function (evt) {
    console.log('primary');
  },

  _checkboxChange: function (evt) {
    console.log(evt.target);
  },

  _changeCurrentHash: function (evt) {
    this.set('currentHash', evt.detail.href);
  },

  _dateChange: evt => {
    console.log(evt.detail);
  }
});
