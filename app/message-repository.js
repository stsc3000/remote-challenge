var _ = require('lodash');
var Message = require('./message');

function groupMessages(messages) {
  return _.groupBy(messages, 'dateString');
}

function filterMessages(messages, options) {
  if (options.showRead) {
    return messages;
  } else {
    return _.where(messages, {read: false});
  }
}

function orderMessagesByDate(messages) {
  return _.sortBy(messages, 'date').reverse()
}

var MessageRepository = function(messagesData) {
  this.messages = _.map(messagesData, function(messageData) {
    return new Message(messageData)
  });
};

_.extend(MessageRepository.prototype, {
  getMessages: function(options) {
    return groupMessages(
      filterMessages(
        orderMessagesByDate(this.messages)
      , options)
    );
  }
});

module.exports = MessageRepository;
