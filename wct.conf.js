module.exports = {
  verbose: true,
  suites: ['_test/index-tdd.html'],
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
