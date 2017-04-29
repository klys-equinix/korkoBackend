var mongoose = require('mongoose');

module.exports = function(wagner) {

  var Coach =
    mongoose.model('Coach', require('./coach'), 'coaches');

  wagner.factory('Coach', function() {
    return Coach;
  });

  return {
    Coach: Coach
  };
};
