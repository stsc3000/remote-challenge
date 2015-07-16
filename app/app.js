var MessagesListView = require('./messages-list-view');
var MessageRepository = require('./message-repository');
var messageData = require("json!./emails.json")
var $ = require('jquery');

var App = function($el) {
  this.messageRepository = new MessageRepository(messageData);
  this.$el = $el;
};

_.extend(App.prototype, {

  getMessagesListView: function() {
    if (!this.messagesListView) {
      this.messagesListView = new MessagesListView(
        this.$el.find('#messages-list'),
        this
      );
    }
    return this.messagesListView;
  },

  start: function() {
    this.getMessagesListView().render();
  }

});

module.exports = App;
