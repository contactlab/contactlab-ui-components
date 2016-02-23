module.exports = {
  verbose: true,
  suites: ['_test/'],
  // persistent: true,
  // testTimeout: 2000000000000000,
  plugins: {
    local: {
      browsers: ['chrome']
    },
     sauce: {
      disabled: true
    }
  }
};
