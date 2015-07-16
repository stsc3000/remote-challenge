var MessagesListView = require('./messages-list-view');
var MessageRepository = require('./message-repository');
var messageData = require("json!./emails.json")
var $ = require('jquery');

$(function() {
  var $messagesList = $('#messages-list');
  var messageRepository = new MessageRepository(messageData);
  var messagesListView = new MessagesListView($messagesList, { messageRepository: messageRepository });
  messagesListView.render();
});
