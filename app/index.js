var App = require('./app');
var $ = require('jquery');

$(function() {
  var app = new App($('body'));
  app.start();
});
