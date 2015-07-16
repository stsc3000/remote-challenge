var MessagesListView = require('./messages-list-view');
var MessagesDetailView = require('./messages-detail-view');
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
      $(this.messagesListView).on('showMessage', _.bind(this.showMessage, this));
    }
    return this.messagesListView;
  },

  getMessagesDetailView: function() {
    if (!this.messagesDetailView) {
      this.messagesDetailView = new MessagesDetailView(
        this.$el.find('#messages-detail'),
        this
      );
    }
    return this.messagesDetailView;
  },


  start: function() {
    this.getMessagesListView().render();
    this.getMessagesDetailView().render();
  },

  showMessage: function(event, messageId) {
    var message = this.messageRepository.getMessageById(messageId);
    this.getMessagesDetailView().showMessage(message);

  }

});

module.exports = App;
