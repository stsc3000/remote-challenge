var $ = require('jquery');
var _ = require('lodash');
var Templates = require('./templates');

var MessagesListView = function($el, app) {
  this.$el = $el;
  this.app = app;
};

_.extend(MessagesListView.prototype, {
  templateSelector: '#messages-list-template',

  getMessageGroups: function() {
    return this.app.messageRepository.getMessages({showRead: true});
  },

  render: function() {
    var viewData = { messageGroups: this.getMessageGroups() };
    var html = Templates.render(this.templateSelector, viewData);

    this.$el.html(html);
  }
});

module.exports = MessagesListView;
