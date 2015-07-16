var App = require('./app');
var $ = require('jquery');
var messageData = require("json!./emails.json")

$(function() {
  var app = new App($('body'), messageData);
  app.start();
});
