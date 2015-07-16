var $ = require('jquery');
var _ = require('lodash');
var Templates = require('./templates');

var MessagesDetailView = function($el, app, options) {
  this.$el = $el;
  this.app = app;
};

_.extend(MessagesDetailView.prototype, {
  templateSelector: '#messages-detail-template',

  rendered: function() {},

  message: null,

  render: function() {
    var viewData = { message: this.message };
    var html = Templates.render(this.templateSelector, viewData);

    this.$el.html(html);
    this.rendered();
  },

  showMessage: function(message) {
    this.message = message;
    this.render();
  }


});

module.exports = MessagesDetailView;
